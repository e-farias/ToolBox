import fs from 'fs'
import {
  authorizedSopClass,
  authorizedStorageClass,
  authorizedTransferSyntax,
  defaultPatient,
  minPhoneLength
} from "./config"
import { getInstanceByAet, createStudy } from './services/db'
import { 
  getDateTimeZone,
  getNumbersFromString,
  createNewDicomFilePath,
} from './utils'
import { Socket } from 'net'
import { TLSSocket } from 'tls'
import * as dcmjsDimse from 'dcmjs-dimse'
import { TScpOpts } from './types/dcmjsDimse'
import { getStudyDateTime } from './services/dicom'

const { Dataset, Server, Scp } = dcmjsDimse
const { CEchoResponse, CFindResponse, CStoreResponse } = dcmjsDimse.responses
const {
  Status,
  PresentationContextResult,
  RejectResult,
  RejectSource,
  RejectReason,
} = dcmjsDimse.constants

class DcmjsDimseScp extends Scp {
  
  private association: any
  
  constructor(
    socket: Socket | TLSSocket,
    opts: TScpOpts
  ) {
    super(socket, opts)
    this.association = undefined
  }

  // Handle incoming association requests
  async associationRequested(association: dcmjsDimse.association.Association) {

    this.association = association

    const aetCalled = this.association.getCalledAeTitle()
    const aet = await getInstanceByAet(aetCalled)
    if (!aet) {

      console.log("❌️ AET not registered")
      console.log({aetCalled, aet})

      this.sendAssociationReject(
        RejectResult.Permanent,
        RejectSource.ServiceUser,
        RejectReason.CalledAeNotRecognized
      )

      return
    }

    // Set the preferred max PDU length
    this.association.setMaxPduLength(65536)

    const contexts = association.getPresentationContexts()
    contexts.map((c) => {

      const context = association.getPresentationContext(c.id)
      const abstractSyntaxUid = context.getAbstractSyntaxUid()
      
      if (
        authorizedSopClass.includes(abstractSyntaxUid) ||
        authorizedStorageClass.includes(abstractSyntaxUid)
      ) {
        
        const transferSyntaxes = context.getTransferSyntaxUids()
        
        transferSyntaxes.map((transferSyntax) => {
          
          if (authorizedTransferSyntax.includes(transferSyntax)) {
            context.setResult(PresentationContextResult.Accept, transferSyntax)
          } else {
            console.log("❌️ Not authorized transfer syntax")
            context.setResult(PresentationContextResult.RejectTransferSyntaxesNotSupported)
          }
        })
      } else {
        console.log("❌️ No abstract syntax uid match")
        context.setResult(PresentationContextResult.RejectAbstractSyntaxNotSupported)
      }
    })

    this.sendAssociationAccept()
  }

  // Handle incoming C-ECHO requests
  cEchoRequest(
    request: dcmjsDimse.requests.CEchoRequest,
    callback: (response: dcmjsDimse.responses.CEchoResponse) => void
  ) {
    const response = CEchoResponse.fromRequest(request)
    response.setStatus(Status.Success)
    callback(response)
  }

  // Handle incoming C-FIND requests
  cFindRequest(
    request: dcmjsDimse.requests.CFindRequest,
    callback: (responses: dcmjsDimse.responses.CFindResponse[]) => void
  ) {

    const pendingResponse = CFindResponse.fromRequest(request)
    pendingResponse.setDataset(new Dataset(defaultPatient))
    pendingResponse.setStatus(Status.Pending)

    const finalResponse = CFindResponse.fromRequest(request)
    finalResponse.setStatus(Status.Success)

    callback([pendingResponse, finalResponse])
  }

  // Handle incoming C-STORE requests
  async cStoreRequest(
    request: dcmjsDimse.requests.CStoreRequest,
    callback: (response: dcmjsDimse.responses.CStoreResponse) => void
  ) {

    const response = CStoreResponse.fromRequest(request)
    const reqAny = request as any
    const reqDataset = reqAny.getDataset()
    
    if (reqDataset) {
      
      const studyInstanceUID: string | undefined = reqDataset.getElement("StudyInstanceUID")
      const SOPInstanceUID: string | undefined = reqDataset.getElement("SOPInstanceUID")

      if (studyInstanceUID && SOPInstanceUID) {

        const filePath = createNewDicomFilePath(  
          studyInstanceUID,
          SOPInstanceUID
        )
        
        // Create file
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (unlinkError) => {
            if (unlinkError) {
              console.log(`
                ❌️ Erro ao apagar a dicom já existente (${filePath})`,
                unlinkError
              )
            }
          })
        }
        
        reqDataset.toFile(filePath)

        // Save Study
        try {

          const aet: string = this.association.getCalledAeTitle() ?? ""
          const instance = await getInstanceByAet(aet)
          if (!instance) {
            this.sendAssociationReject(
              RejectResult.Permanent,
              RejectSource.ServiceUser,
              RejectReason.CalledAeNotRecognized
            )
            return
          }

          let date = getDateTimeZone()
          const studyDate: string | undefined = reqDataset.getElement("StudyDate")
          const studyTime: string | undefined = reqDataset.getElement("StudyTime")
          if (studyDate) {
            date = getStudyDateTime(studyDate, studyTime)
          }
          
          const description: string = reqDataset.getElement("StudyDescription") ?? ""
          const studyPatientId: string = reqDataset.getElement("PatientID") ?? ""
          
          // Patient Phone
          let patientPhone: string | null = null
          const phoneFromTelephone: string | undefined = reqDataset.getElement("PatientTelephoneNumbers")
          const phoneFromComments: string | undefined = reqDataset.getElement("PatientComments")
          if (phoneFromTelephone !== undefined) {
            const phoneNumbers = getNumbersFromString(phoneFromTelephone)
            if (!(phoneNumbers.length < minPhoneLength)) {
              patientPhone = phoneNumbers
            }
          }
          if (!patientPhone && phoneFromComments) {
            const phoneNumbers = getNumbersFromString(phoneFromComments)
            if (!(phoneNumbers.length < minPhoneLength)) {
              patientPhone = phoneNumbers
            }
          }

          let patientName = reqDataset.getElement("PatientName")
          if (patientName && patientName.length > 0) {
            patientName = patientName[0].Alphabetic
          } else {
            patientName = ""
          }
          
          await createStudy({
            instanceId: instance.id,
            aet,
            studyInstanceUID,
            description,
            studyPatientId,
            patientName,
            patientPhone,
            date,
          })
          response.setStatus(Status.Success)
        } catch (createStudyError) {
          console.log("❌️ error: createStudy\n", createStudyError)
          response.setStatus(Status.ProcessingFailure)
          return
        }

      } else {
        console.log("❌️ StudyInstanceUID or SOPInstanceUID not found")
        response.setStatus(Status.InvalidObjectInstance)
        return
      }
    } else {
      console.log("❌️ Dataset is undefined")
      response.setStatus(Status.NoSuchObjectInstance)
      return
    }
    
    callback(response)
  }

  // Handle incoming association release requests.
  associationReleaseRequested() {
    this.sendAssociationReleaseResponse()
  }

}

const DimseServer = new Server(DcmjsDimseScp)

export default DimseServer
