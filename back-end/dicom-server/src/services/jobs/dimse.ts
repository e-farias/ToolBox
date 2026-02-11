// Utils
import * as schedule from "node-schedule"
import db from "../prisma"
import {
  findAllFiles,
  convertImageToBase64,
  timeZones,
  getFileName
} from "../../utils"
import { dcmj2pnm } from "../dcmtk"
import { storagePath } from '../../config'
import path from 'path'
import { toZonedTime, format } from "date-fns-tz"
import { createExamsPdf } from "../exam"
import fs from 'fs'
import { StorageUploadFilePath } from "../gcp/storage"
import { sendWhatsAppMessage } from "../fala-app"
import { Prisma } from "@prisma/client"

class DimseJobs {

  public async createExams(
    rule: string,
    amount: number
  ) {
    schedule.scheduleJob(rule, async function () {
      console.log(`\n[START] ▶️  createExams: Job is runnig!`)

      const studies = await db.instanceExam.findMany({
        where: {
          pdfUrl: null
        },
        select: {
          id: true,
          studyInstanceUID: true,
          studyPatientId: true,
          patientName: true,
          patientPhone: true,
          description: true,
          date: true,
          instance: {
            select: {
              id: true,
              name: true,
              status: true,
              config: {
                select: {
                  examImgHorizontalUrl: true,
                  examImgIconUrl: true,
                  examImgAmountPerPage: true,
                }
              }
            }
          }
        },
        take: amount
      })

      await Promise.all(studies.map(async (study) => {

        try {

          if (!study.instance.status) {
            throw Error(`Essa instância (${study.instance.name}) está bloqueada.`)
          }

          // Get dicom image
          const storagePathFull = path.join(__dirname, `../../${storagePath}/${study.studyInstanceUID}`)
          const dicomPaths = findAllFiles(storagePathFull, ".dcm")

          if (dicomPaths.length === 0) {
            throw Error("Não foi possível encontrar os arquivos do exame.")
          }

          await Promise.all(
            dicomPaths.map(async (dicomPath) => {
              await dcmj2pnm(dicomPath)
            })
          )

          const dicomImgPaths = findAllFiles(storagePathFull, ".jpg")

          if (dicomPaths.length !== dicomImgPaths.length) {
            throw Error("Nem todos os dicom foram convertidos em imagens.")
          }

          // Create pdf exam
          const dateFormated = format(
            toZonedTime(study.date, timeZones.Sao_Paulo),
            "dd/MM/yyy - HH:mm"
          )
          const pdfFilePath = await createExamsPdf({
            studyInstanceUID: study.studyInstanceUID,
            imgHorizontalUrl: study.instance.config?.examImgHorizontalUrl ?? null,
            imgIconUrl: study.instance.config?.examImgIconUrl ?? null,
            studyDescription: study.description,
            studyPatientName: study.patientName,
            studyPatientId: study.studyPatientId,
            studyDate: dateFormated,
            imgs: dicomImgPaths.map(path => convertImageToBase64(path))
          }, study.instance.config?.examImgAmountPerPage ?? 6)

          // Upload study to bucket
          const destPath = `study/${study.studyInstanceUID}`

          const pdfUrl = await StorageUploadFilePath(
            pdfFilePath,
            `${destPath}/${getFileName(pdfFilePath)}`,
            true
          )
          await Promise.all(
            dicomPaths.map(async (dicomPath, index) => {
              await StorageUploadFilePath(
                dicomPath,
                `${destPath}/${getFileName(dicomPath)}`,
                false
              )
            })
          )

          let query: Prisma.InstanceExamUpdateArgs = {
            where: {
              id: study.id
            },
            data: {
              pdfUrl,
            }
          }

          // Delete study files from Local
          dicomImgPaths.map((imgPath) => {
            fs.unlink(imgPath, (unlinkError) => {
              if (unlinkError) {
                console.log(`❌️ Erro ao apagar a imagem (${imgPath})`, unlinkError)
              }
            })
          })
          fs.rm(storagePathFull, { recursive: true, force: true }, (rmError) => {
            if (rmError) {
              console.log(`❌️ Erro ao apagar pasta do estudo`, rmError)
            }
          })

          // Sent exam
          if (study.patientPhone) {

            const sent = await sendWhatsAppMessage(
              study.patientPhone,
              study.patientName,
              study.instance.name,
              pdfUrl
            )

            query.data.sent = sent

          }

          // Update Study DB
          await db.instanceExam.update(query)

        } catch (error) {
          console.log(`\n[FAILED] ❌️ createExams (studyId: ${study.id}) : Job failed!\n`, error)
        }
      }))
      
      await db.$disconnect()
      console.log(`\n[DONE] ✅ createExams: Job is done!`)
    })
  }

  public async sentExams(
    rule: string,
    amount: number
  ) {
    schedule.scheduleJob(rule, async function () {
      console.log(`\n[START] ▶️  sentExams: Job is runnig!`)

      const studies = await db.instanceExam.findMany({
        where: {
          sent: false,
          patientPhone: {
            not: null
          },
          pdfUrl: {
            not: null
          },
        },
        select: {
          id: true,
          patientPhone: true,
          patientName: true,
          pdfUrl: true,
          instance: {
            select: { name: true }
          },
        },
        take: amount
      })

      await Promise.all(studies.map(async (study) => {

        try {


          // Sent exam
          if (study.patientPhone && study.pdfUrl) {

            const sent = await sendWhatsAppMessage(
              study.patientPhone,
              study.patientName,
              study.instance.name,
              study.pdfUrl
            )

            // Update Study DB
            await db.instanceExam.update({
              where: { id: study.id },
              data: { sent }
            })
          
          }

        } catch (error) {
          console.log(`\n[FAILED] ❌️ sentExams (studyId: ${study.id}) : Job failed!\n`, error)
        }
      }))
      
      await db.$disconnect()
      console.log(`\n[DONE] ✅ sentExams: Job is done!`)
    })
  }
}

export default new DimseJobs()