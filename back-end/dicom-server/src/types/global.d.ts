namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL_DIMSE: string
    DATABASE_URL_PLATFORM: string
    
    APP_AET: string
    APP_PORT: string

    GCP_BUCKET_NAME: string
    GCP_PROJECT_ID: string

    FALA_APP_API_BASE_URL: string
    FALA_APP_SESSION_ID: string
    FALA_APP_CUSTOMER_ID: string
    FALA_APP_TOKEN: string
  }
}