import fs from 'fs'
// @ts-ignore
import dcmjs from 'dcmjs'
import { getNumbersFromString, timeZones } from '../utils'
import { minPhoneLength } from '../config'
import { toZonedTime } from 'date-fns-tz'

export const getStudyDateTime = (dateStr: string, timeStr?: string) => {
  
  const year = parseInt(dateStr.substring(0, 4), 10)
  const month = parseInt(dateStr.substring(4, 6), 10) - 1
  const day = parseInt(dateStr.substring(6, 8), 10)

  let hour = 0
  let minute = 0
  let second = 0

  if (timeStr) {
    hour = parseInt(timeStr.substring(0, 2), 10)
    minute = parseInt(timeStr.substring(2, 4), 10)
    second = parseInt(timeStr.substring(4, 6), 10)
  }

  return toZonedTime(
    new Date(year, month, day, hour, minute, second),
    timeZones.Sao_Paulo
  )
}

export const getPatientPhone = (
  dicomPath: string,
) => {

  let exist: string | null = null

  try {
    // Open Dicom
    let arrayBuffer = fs.readFileSync(dicomPath).buffer
    let dicomDict = dcmjs.data.DicomMessage.readFile(arrayBuffer)
    let dataSet = dcmjs.data.DicomMetaDictionary.naturalizeDataset(dicomDict.dict)

    // Search data
    const phoneFromTelephone: string | undefined = dataSet.PatientTelephoneNumbers
    const phoneFromComments: string | undefined = dataSet.PatientComments

    if (phoneFromTelephone !== undefined) {
      const phone = getNumbersFromString(phoneFromTelephone)
      if (!(phone.length < minPhoneLength)) {
        exist = phone
      }
    }

    if (!exist && phoneFromComments) {
      const phone = getNumbersFromString(phoneFromComments)
      if (!(phone.length < minPhoneLength)) {
        exist = phone
      }
    }

  } catch (error: any) {
    console.log(`error: ❌️ (getPatientPhone)\n`, error)
  } finally {
    return exist
  }
}

export const addPatientTelephone = (
  dicomPath: string,
  phone: string
) => {

  let update = false

  try {
    // Read Dicom
    let arrayBuffer = fs.readFileSync(dicomPath).buffer
    let dicomDict = dcmjs.data.DicomMessage.readFile(arrayBuffer)
    let dataSet = dcmjs.data.DicomMetaDictionary.naturalizeDataset(dicomDict.dict)

    if (!dataSet.PatientTelephoneNumbers) {
      dataSet.PatientTelephoneNumbers = phone
    }

    // Save Dicom on Array Buffer
    dicomDict.dict = dcmjs.data.DicomMetaDictionary.denaturalizeDataset(dataSet)
    let new_file_WriterBuffer = dicomDict.write()
    fs.writeFileSync(dicomPath, Buffer.from(new_file_WriterBuffer))

    update = true

  } catch (error: any) {
    console.log(`error: ❌️ (addPatientTelephone)\n`, error)
  } finally {
    return update
  }
}

export const addPatientComment = (
  dicomPath: string,
  comment: string
) => {

  let update = false

  try {
    // Read Dicom
    let arrayBuffer = fs.readFileSync(dicomPath).buffer
    let dicomDict = dcmjs.data.DicomMessage.readFile(arrayBuffer)
    let dataSet = dcmjs.data.DicomMetaDictionary.naturalizeDataset(dicomDict.dict)

    if (!dataSet.PatientComments) {
      dataSet.PatientComments = comment
    }

    // Save Dicom on Array Buffer
    dicomDict.dict = dcmjs.data.DicomMetaDictionary.denaturalizeDataset(dataSet)
    let new_file_WriterBuffer = dicomDict.write()
    fs.writeFileSync(dicomPath, Buffer.from(new_file_WriterBuffer))

    update = true

  } catch (error: any) {
    console.log(`error: ❌️ (addPatientComment)\n`, error)
  } finally {
    return update
  }
}
