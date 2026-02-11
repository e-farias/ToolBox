'use client'

import { parse } from 'json2csv'
import toast from 'react-hot-toast'

export const downloadFileUrl = (fileUrl: string) => {
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileUrl.split('/').pop() || 'download'
  link.click()
}

export const downloadCsv = (data: any[], fileName: string) => {
  
  const arrayToCsv = (array: any[]) => {
    try {
      const csv = parse(array)
      return csv
    } catch (error) {
      console.log('[ERROR]: ❌ arrayToCsv\n', error)
      toast.error('Erro ao converter dados.')
    }
  }
  
  const download = (csv: any, fileName: string) => {
    try {
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.log('[ERROR]: ❌ downloadCsv\n', error)
      toast.error('Erro ao baixar arquivo CSV.')
    }
  }
  
  const csv = arrayToCsv(data)
  if (csv) {
    download(csv, fileName)
  }
}

export const downloadBlobFile = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const handleCopyToClipboard = (string: string) => {
  navigator.clipboard.writeText(string)
  .then(() => {
    toast.success('Copiado')
  })
  .catch((err) => {
    console.log('[ERROR]: ❌ handleCopyToClipboard\n', err)
    toast.error('Falha ao copiar. Relate ao suporte.')
  })
}
