import { SecureContext } from 'tls'

export type TScpOpts = {
  connectTimeout?: number
  associationTimeout?: number
  pduTimeout?: number
  logCommandDatasets?: boolean
  logDatasets?: boolean
  datasetReadOptions?: Record<string, unknown>
  datasetWriteOptions?: Record<string, unknown>
  datasetNameMap?: Record<string, unknown>
  securityOptions?: {
    key?: string | Array<string> | Buffer | Array<Buffer>
    cert?: string | Array<string> | Buffer | Array<Buffer>
    ca?: string | Array<string> | Buffer | Array<Buffer>
    requestCert?: boolean
    rejectUnauthorized?: boolean
    minVersion?: string
    maxVersion?: string
    ciphers?: string
    SNICallback?:
    | ((servername: string, cb: (err: Error | null, ctx?: SecureContext) => void) => void)
    | undefined
  }
} | undefined