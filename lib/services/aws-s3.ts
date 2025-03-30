import { S3 } from "@aws-sdk/client-s3"

const clientConfig = {
  endpoint: `https://${process.env.AWS_ENDPOINT}`,
  region: `${process.env.AWS_S3_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
  }
}

const s3 = new S3(clientConfig)

export const S3UploadFile = async (
  file: File,
  filePath: string
) => {

  const fileBytes = await file.arrayBuffer()
  const fileBuffer = Buffer.from(fileBytes)

  const response = await s3.putObject({
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    Body: fileBuffer,
    Key: filePath,
    ContentType: file.type,
    ACL: 'public-read'
  })

  return response
}

export const S3DeleteFiles = async (ObjectsKeys: {
  Key: string
}[]) => {

  const response = await s3.deleteObjects({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Delete: {
      Objects: ObjectsKeys,
      Quiet: false
    }
  })

  return response
}
