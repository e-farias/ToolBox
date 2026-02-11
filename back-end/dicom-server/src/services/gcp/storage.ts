import { Storage } from "@google-cloud/storage"
import path from 'path'

// Creates a client
const keyFilename = path.join(__dirname, './service-account.json') 
const storage = new Storage({
  keyFilename
})
const bucketName = process.env.GCP_BUCKET_NAME

export const StorageUploadFilePath = async (
  filePath: string,
  destPath: string,
  isPublic: boolean
) => {

  await storage.bucket(bucketName).upload(filePath, {
    destination: destPath,
    public: isPublic
  })

  return `https://storage.googleapis.com/${bucketName}/${destPath}`
}
