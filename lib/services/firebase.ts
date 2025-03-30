import * as firebaseAdmin from "firebase-admin"
import { v4 as uuid } from "uuid"

import serviceAccountKey from "../../service-account.json"

class FirebaseService {

  initialize(gcpBucket:string) {

    try {
      
      const serviceAccountString:any = JSON.stringify(serviceAccountKey)
      const serviceAccountObj:Object = JSON.parse(serviceAccountString)
      
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccountObj),
        storageBucket: gcpBucket,
      })

      return true

    } catch (errorFirebaseInitialize) {
      console.log(`🚨 Error (firebaseInitialize): ${errorFirebaseInitialize}`)
      return false
    }

  }

  async uploadFile(
    fileName:string,
    destination:string,
    contentType:string = 'application/octet-stream'
    ) {
    await new Promise((resolve, reject) => {
      
      const fileNameShort:Array<string> = fileName.split("/")
      const fileNameShortFinal:string = fileNameShort[fileNameShort.length-1]
      const destinationFinal = `${destination + fileNameShortFinal}`
      const token = uuid()
      const bucket = firebaseAdmin.storage().bucket()

      const bucketUploadOptions = {
        destination: destinationFinal,
        uploadType: 'media',
        metadata: {
          contentType,
          metadata: {
            firebaseStorageDownloadTokens: token,
          },
        },
      }

      bucket.upload(fileName, bucketUploadOptions)
        .then(result => {
          const finalUrl:string = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(result[0].name)}?alt=media&token=${token}`
          resolve(true)
        })
        .catch(errorUploadToBucket => {
          console.log(`🚨 Error (uploadToBucket): ${errorUploadToBucket}`)
          reject(false)
        })
    })
  }

}

export default new FirebaseService()