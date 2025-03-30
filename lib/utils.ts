import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  addDays,
  addMonths,
  getDay,
  setDay,
  setHours,
  isBefore,
  intervalToDuration
} from "date-fns"
import { DocType } from "./types"

export const stringToBase64 = (string: string) => {
  try {
    const base64 = Buffer.from(string).toString('base64')
    return base64
  } catch (error) {
    return null
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ")
}

export const getDocType = (doc: string) => {

  doc = doc.replaceAll(/[^A-Z0-9]/ig, "")

  let docType: DocType = "CPF"

  if (doc.length > 11) {
    docType = "CNPJ"
  }

  return docType
}

export const bytesToMB = (bytes: number) => {
  const megabyte = 1000000 // 1 MB = 1e+6
  return bytes / megabyte
}

export const generateRandomPassword = (passwordLength = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const password = []

  for (let i = 0; i < passwordLength; i++) {
    const characterIndex = Math.floor(Math.random() * characters.length)
    password.push(characters[characterIndex])
  }

  return password.join("")
}

export const getNextPossibleDateInAMonth = (date: Date) => {
  const nextMonth = addMonths(date, 1)
  const dayOfWeek = getDay(date)

  return setDay(nextMonth, dayOfWeek)
}

export const getRecurrencePeriodDays = (period: 'weekly' | 'biweekly' | 'monthly') => {
  if (period == 'monthly') {
    return 30
  } else if (period == 'biweekly') {
    return 14
  } else { // weekly
    return 7
  }
}

export const validateEmailRegex = (email: string) => {

  const isValid = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  if (isValid) {
    return true
  } else {
    return false
  }
}

type TConfig = {
  appName: string
  appDescription: string
  fileUpload: {
    maxSizeInByte: number
    maxSizeInByteImage: number
    acceptedFilesExtentions: string[]
  }
  rolesToDeny: {
    usersActions: UserRoles[]
    patientActions: UserRoles[]
    patientMedicalRecord: UserRoles[]
    therapistActions: UserRoles[]
    clinic: UserRoles[]
    task: UserRoles[]
    taskPatient: UserRoles[]
    review: UserRoles[]
    signature: UserRoles[]
    financial: UserRoles[]
    transferTherapistPatients: UserRoles[]
    patientDataSharing: UserRoles[]
    storageFolderActions: UserRoles[]
    storageFolderView: UserRoles[]
  }
}

const filesExtentionsImage = [
  "jpeg",
  "jpg",
  "png",
  "webp",
]

const filesExtentionsVideo = [
  "mp4",
  "webm",
  "avi",
]

const filesExtentionsAudio = [
  "mp3",
  "weba",
]

const filesExtentionsDoc = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "csv",
  "txt",
]

const filesExtentionsOthers = [
  "rar",
  "zip"
]

export const acceptedFilesExtentions = [
  ...filesExtentionsImage,
  ...filesExtentionsVideo,
  ...filesExtentionsAudio,
  ...filesExtentionsDoc,
  ...filesExtentionsOthers
]

export const CONFIG: TConfig = {
  appName: "Interato",
  appDescription: "Gestão terapéutica",
  fileUpload: {
    maxSizeInByte: 300000000, // 300mb
    maxSizeInByteImage: 5000000, // 5mb
    acceptedFilesExtentions: acceptedFilesExtentions
  },
  rolesToDeny: {
    clinic: ["Admin", "Desk", "PatientResponsible", "Nurse"],
    usersActions: ["Therapist", "Nurse", "PatientResponsible"],
    patientActions: ["Nurse", "PatientResponsible"],
    patientMedicalRecord: [
      "SuperAdmin",
      "Admin",
      "Desk",
      "Nurse",
      "Technician"
    ],
    therapistActions: ["PatientResponsible", "Therapist"],
    task: ["Admin", "Desk", "PatientResponsible", "Nurse"],
    taskPatient: ["Admin", "Desk", "Nurse"],
    review: ["Admin", "Desk", "PatientResponsible", "Nurse"],
    signature: [
      "SuperAdmin",
      "Admin",
      "Desk",
      "PatientResponsible",
      "Nurse",
    ],
    financial: [
      "Desk",
      "Nurse",
      "PatientResponsible",
      "Therapist",
      "Technician"
    ],
    transferTherapistPatients: [
      "Nurse",
      "PatientResponsible",
      "Technician",
      "Therapist"
    ],
    patientDataSharing: [
      "SuperAdmin",
      "Admin",
      "Desk",
      "Nurse",
      "Technician"
    ],
    storageFolderActions: [
      "Admin",
      "Desk",
      "Nurse",
      "PatientResponsible",
      "Technician",
      "Therapist"
    ],
    storageFolderView: [
      "Desk",
      "Nurse",
      "Technician",
    ]
  }
}

export const getColorHigh = (hexColor: string) => `${hexColor}12`
export const getColorMid = (hexColor: string) => `${hexColor}80`
export const getColorLow = (hexColor: string) => `${hexColor}40`

export const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 200 ? 'black' : 'white'
}

const formatMoneyBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

export const maskMoneyNumber = (money: number) => {
  const float = money / 100
  const moneyBRL = formatMoneyBRL.format(float)
  return moneyBRL
}

export const convertValueToDB = (value: string) => {

  let valueFloatString = value
  const isFloat = valueFloatString.includes(",")

  if (!isFloat) {
    const numberFormat = formatMoneyBRL.format(Number(valueFloatString))
    const numberFormatString = numberFormat.toString()
    valueFloatString = numberFormatString.replaceAll("R$ ", "").replaceAll(".", "")
  }

  const [integerPart, decimalPart] = valueFloatString.split(",")

  let formattedDecimalPart = "00"

  if (decimalPart.length > 0) {
    const decimalPartClear = decimalPart
    if (decimalPartClear.length === 1) {
      formattedDecimalPart = `${decimalPartClear}0`
    } else {
      formattedDecimalPart = decimalPartClear
    }
  }

  const integerPartClear = integerPart.replace(/\D/g, "")
  const formattedValue = Number(`${integerPartClear}${formattedDecimalPart}`)

  return formattedValue

}

export const addTextBreakLines = (str: string) => {
  return str.replace(/\n/g, "<br>")
}

export const isExpired = (date: Date) => {
  const dateTomorrow = addDays(date, 1)
  const expired = isBefore(dateTomorrow, new Date())
  return expired
}

export const getFileUrlExtension = (fileUrl: string) => {

  const splitDot = fileUrl.split(".")

  if (splitDot.length > 0) {

    let extension = splitDot[splitDot.length - 1]
    return extension

  } else {
    return undefined
  }

}

export const timeZones = {
  Sao_Paulo: "America/Sao_Paulo",
  New_York: "America/New_York"
}

export const getAge = (birthdate: Date) => {

  const { years, months, days } = intervalToDuration({
    start: birthdate,
    end: new Date()
  })

  let age = ''

  if (years && years > 0) {
    age = `${years} anos`
  }

  if (months && (!years || (years && years < 0))) {
    age = `${months} meses`
  }

  return age
}