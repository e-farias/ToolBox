import { Storage } from "@google-cloud/storage"

const keyFilename = "./lib/services/gcp/service-account.json"
const storage = new Storage({
  keyFilename,
})
const bucketName = process.env.GCP_BUCKET_NAME

export const StorageUploadFile = async (
  file: File,
  destPath: string,
) => {
  const fileBytes = await file.arrayBuffer()
  const fileBuffer = Buffer.from(fileBytes)

  await storage.bucket(bucketName).file(destPath).save(fileBuffer, {
    public: true,
  })

  return `https://storage.googleapis.com/${bucketName}/${destPath}`
}
