import { storagePath } from '../config'
import { getDateTimeZone } from '../utils'
import path from 'path'
import db from './prisma'

export const getInstanceByAet = async (aet: string) => {

  type InstanceByAet = {
    id: string
  }

  let success: null | InstanceByAet = null

  try {
    
    const instanceAets = await db.instanceAet.findMany({
      where: { name: aet },
      select: {
        instance: {
          select: {
            id: true
          }
        }
      }
    })

    if (instanceAets.length > 0) {
      success = {
        id: instanceAets[0].instance.id
      }
    }

  } catch (error) {
    console.log("❌️ error (getInstanceByAet):\n", error)
  } finally {
    await db.$disconnect()
    return success
  }
}

type CreateStudyProps = {
  instanceId: string
  aet: string
  studyInstanceUID: string
  description: string
  studyPatientId: string
  patientName: string
  patientPhone: string | null
  date: Date
}

export const createStudy = async ({
  instanceId,
  aet,
  studyInstanceUID,
  description,
  studyPatientId,
  patientName,
  patientPhone,
  date,
} : CreateStudyProps) => {
  
  let success = false

  try {

    const exist = await db.instanceExam.count({
      where: {
        studyInstanceUID,
        instanceId
      }
    })
  
    if (exist === 0) {
  
      const folderPath = path.join(storagePath, studyInstanceUID)
  
      await db.instanceExam.create({
        data: {
          instanceId,
          aetOnCreated: aet,
          studyInstanceUID,
          folderPath,
          description,
          studyPatientId,
          patientName,
          patientPhone,
          date,
          createdAt: getDateTimeZone()
        }
      })

      success = true

    }
  } catch (error) {
    console.log("❌️ error (createStudy):\n", error)
  } finally {
    await db.$disconnect()
    return success
  }
}
