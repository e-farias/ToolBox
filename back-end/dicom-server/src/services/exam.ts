import puppeteer, { PDFOptions } from "puppeteer"
import Handlebars from "handlebars"
import fs from 'fs'
import path from "path"
import { storagePath } from "../config"
import { format, toZonedTime } from "date-fns-tz"
import { timeZones } from "../utils"

type ExamPage = {
  studyInstanceUID: string
  imgHorizontalUrl: string | null
  imgIconUrl: string | null
  studyDescription: string
  studyPatientName: string
  studyPatientId: string
  studyDate: string
  imgs: string[]
}

type ExamPagePagined = ExamPage & {
  page: number
}

const getTemplate = ( data: ExamPage[], imgsPerPage: number ) => {
  const templateFilePath = path.join(__dirname, `../templates/${imgsPerPage}.hbs`)
  const templateContent = fs.readFileSync(templateFilePath, 'utf-8')
  const template = Handlebars.compile(templateContent)
  return template({pages: data})
}

export const createExamsPdf = async (data: ExamPage, imgsPerPage: number) => {

  const pagesAmount = Math.ceil(data.imgs.length / imgsPerPage)
  const pages: ExamPage[] = []

  for (let i = 0; i < pagesAmount; i++) {
    const startIndex = i * imgsPerPage
    const endIndex = startIndex + imgsPerPage
    pages.push({
      ...data,
      imgs: data.imgs.slice(startIndex, endIndex),
    })
  }

  const pagesPagined: ExamPagePagined[] = pages.map((page, index) => ({
    ...page,
    page: index+1
  }))

  const browser = await await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  const content = getTemplate(pagesPagined, imgsPerPage)
  await page.setContent(content)
  
  const today = toZonedTime(new Date(), timeZones.Sao_Paulo)
  const todayFormated = format(today, "yyyyMMddHHmmss")
  const pdfPath = path.join(
    __dirname,
    `../${storagePath}/${data.studyInstanceUID}`,
    `/exame_${todayFormated}.pdf`
  )
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    waitForFonts: true,
    width: '21cm',
    height: '29.7cm',
    margin: {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
    }
  })

  await browser.close()

  return pdfPath
}
