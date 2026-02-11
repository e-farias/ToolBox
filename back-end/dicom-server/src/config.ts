import dcmjsDimse from 'dcmjs-dimse'

const {
  TransferSyntax,
  StorageClass,
  SopClass
} = dcmjsDimse.constants

export const storagePath = "storage/study"
export const serverPeer = {
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8888,
  aet: process.env.APP_AET ?? "NextMedPACS",
  ip: "127.0.0.1",
}

export const authorizedSopClass = [
  SopClass.Verification,
  SopClass.StudyRootQueryRetrieveInformationModelFind,
]

export const authorizedStorageClass = [
  StorageClass.BasicTextSrStorage,
  StorageClass.BreastProjectionXRayImageStorageForPresentation,
  StorageClass.BreastProjectionXRayImageStorageForProcessing,
  StorageClass.BreastTomosynthesisImageStorage,
  StorageClass.ChestCadSrStorage,
  StorageClass.ComprehensiveSrStorage,
  StorageClass.ComputedRadiographyImageStorage,
  StorageClass.CtImageStorage,
  StorageClass.DigitalIntraOralXRayImageStorageForPresentation,
  StorageClass.DigitalIntraOralXRayImageStorageForProcessing,
  StorageClass.DigitalMammographyXRayImageStorageForPresentation,
  StorageClass.DigitalMammographyXRayImageStorageForProcessing,
  StorageClass.DigitalXRayImageStorageForPresentation,
  StorageClass.DigitalXRayImageStorageForProcessing,
  StorageClass.EncapsulatedCdaStorage,
  StorageClass.EncapsulatedPdfStorage,
  StorageClass.EnhancedCtImageStorage,
  StorageClass.EnhancedMrColorImageStorage,
  StorageClass.EnhancedMrImageStorage,
  StorageClass.EnhancedPetImageStorage,
  StorageClass.EnhancedSrStorage,
  StorageClass.EnhancedXaImageStorage,
  StorageClass.EnhancedXrfImageStorage,
  StorageClass.IntravascularOpticalCoherenceTomographyImageStorageForPresentation,
  StorageClass.IntravascularOpticalCoherenceTomographyImageStorageForProcessing,
  StorageClass.LegacyConvertedEnhancedCTImageStorage,
  StorageClass.LegacyConvertedEnhancedMRImageStorage,
  StorageClass.LegacyConvertedEnhancedPETImageStorage,
  StorageClass.MammographyCadSrStorage,
  StorageClass.MrImageStorage,
  StorageClass.MultiframeGrayscaleByteSecondaryCaptureImageStorage,
  StorageClass.MultiframeGrayscaleWordSecondaryCaptureImageStorage,
  StorageClass.MultiframeSingleBitSecondaryCaptureImageStorage,
  StorageClass.MultiframeTrueColorSecondaryCaptureImageStorage,
  StorageClass.NuclearMedicineImageStorage,
  StorageClass.OphthalmicOpticalCoherenceTomographyEnFaceImageStorage,
  StorageClass.OphthalmicPhotography16BitImageStorage,
  StorageClass.OphthalmicPhotography8BitImageStorage,
  StorageClass.OphthalmicTomographyImageStorage,
  StorageClass.PositronEmissionTomographyImageStorage,
  StorageClass.RtImageStorage,
  StorageClass.SecondaryCaptureImageStorage,
  StorageClass.UltrasoundImageStorage,
  StorageClass.UltrasoundMultiframeImageStorage,
  StorageClass.VideoEndoscopicImageStorage,
  StorageClass.VideoMicroscopicImageStorage,
  StorageClass.VideoPhotographicImageStorage,
  StorageClass.VlEndoscopicImageStorage,
  StorageClass.VlMicroscopicImageStorage,
  StorageClass.VlPhotographicImageStorage,
  StorageClass.VlSlideCoordinatesMicroscopicImageStorage,
  StorageClass.VlWholeSlideMicroscopyImageStorage,
  StorageClass.WideFieldOphthalmicPhotography3dCoordinatesImageStorage,
  StorageClass.WideFieldOphthalmicPhotographyStereographicProjectionImageStorage,
  StorageClass.XRay3dAngiographicImageStorage,
  StorageClass.XRay3dCraniofacialImageStorage,
  StorageClass.XRayAngiographicImageStorage,
  StorageClass.XRayRadiationDoseSRStorage,
  StorageClass.XRayRadiofluoroscopicImageStorage,
]

export const authorizedTransferSyntax = [
  TransferSyntax.ImplicitVRLittleEndian,
  TransferSyntax.ExplicitVRLittleEndian
]

export const defaultPatient = {
  PatientID: '0000000',
  PatientName: 'Paciente Padrão'
}

export const minPhoneLength = 10 // 00 0000-0000

export const defaultExamNotificationMsg = (
  patientName: string,
  instanceName: string
) => {
  return `Olá, ${patientName}! Aqui está seu exame feito pela clínica ${instanceName}!`
}
