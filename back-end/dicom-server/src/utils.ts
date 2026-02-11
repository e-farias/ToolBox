import path from 'path'
import { storagePath } from './config'
import fs from 'fs'
import { toZonedTime } from 'date-fns-tz'

export const getDateTimeZone = () => {
  return toZonedTime(
    new Date(),
    timeZones.Sao_Paulo
  )
}

export const getNumbersFromString = (inputString: string) => {
  const numbers = inputString.match(/\d+/g)
  return numbers ? numbers.join('') : ''
}

export const getFileName = (
  fullFilePath: string,
) => {
  const last = fullFilePath.split('/').length - 1
  const fileName = fullFilePath.split('/')[last]
  return fileName
}

export const convertImageToBase64 = (filePath: string) => {
  const imageBuffer = fs.readFileSync(filePath)
  const base64Image = imageBuffer.toString('base64')
  const mimeType = 'image/jpeg'
  return `data:${mimeType};base64,${base64Image}`
}

export const createNewDicomFilePath = (
  StudyInstanceUID: string,
  instanceUID: string,
) => {
  
  const folder = path.join(__dirname, `./${storagePath}/${StudyInstanceUID}`)

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }

  return path.join(folder, `${instanceUID}.dcm`)
}

export const findAllFiles = (rootPath: string, fileExtension: string) => {
  
  let results: string[] = []

  const search = (directory: string) => {
    const files = fs.readdirSync(directory)
    for (const file of files) {
      const fullPath = path.join(directory, file)
      const stats = fs.statSync(fullPath)
      if (stats.isDirectory()) {
        search(fullPath)
      } else if (stats.isFile() && path.extname(fullPath) === fileExtension) {
        results.push(fullPath)
      }
    }
  }

  search(rootPath)
  return results
}

export const timeZones = {
  Sao_Paulo: "America/Sao_Paulo",
  New_York: "America/New_York"
}
