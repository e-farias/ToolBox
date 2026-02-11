import * as SendGrid from '@sendgrid/mail'

// Setup
const apiKey: any = process.env.SENDGRID_API_KEY
const emailFrom: any = process.env.SENDGRID_SENDER
const templateIds = {
  forgetPassword: process.env.SENDGRID_TEMPLATE_ID_FORGET_PASSWORD,
  welcome: process.env.SENDGRID_TEMPLATE_ID_WELCOME,
}

SendGrid.setApiKey(apiKey)

export const sendWelcomeEmail = ({
  userEmail,
  userName,
  instanceName,
  instanceColorPrimary,
  instanceLoginUrl,
  password
}: {
  userEmail: string
  userName: string
  instanceName: string
  instanceColorPrimary: string
  instanceLoginUrl: string
  password: string
}) => {
  try {
    const data: any = {
      to: userEmail,
      from: emailFrom,
      subject: `${instanceName}: Bem vindo!`,
      attachments: [],
      templateId: templateIds.welcome,
      dynamicTemplateData: {
        userName,
        instance: {
          name: instanceName,
          colorPrimary: instanceColorPrimary,
          loginUrl: instanceLoginUrl
        },
        password
      }
    }

    let sent = true

    SendGrid.send(data)
      .then(() => {
        sent = true
      })
      .catch((error: any) => {
        console.log('error (sendWelcomeEmail - sendgrid): ❌ ', error)
        sent = false
      })

    return sent
  } catch (error) {
    console.log('error (sendWelcomeEmail): ❌ ', error)
    return false
  }
}

export const sendForgetPasswordEmail = ({
  userEmail,
  userName,
  instanceName,
  instanceColorPrimary,
  link
}: {
  userEmail: string
  userName: string
  instanceName: string
  instanceColorPrimary: string
  link: string
}) => {
  try {
    const msg: any = {
      to: userEmail,
      from: emailFrom,
      subject: `${instanceName}: Redefinir Senha`,
      attachments: [],
      templateId: templateIds.forgetPassword,
      dynamicTemplateData: {
        userName,
        instance: {
          name: instanceName,
          colorPrimary: instanceColorPrimary
        },
        link
      }
    }

    let sent = true

    SendGrid.send(msg)
      .then(() => {
        sent = true
      })
      .catch((error: any) => {
        console.log('error (sendForgetPasswordEmail - sendgrid): ❌ ', error)
        sent = false
      })

    return sent
  } catch (error) {
    console.log('error (sendForgetPasswordEmail): ❌ ', error)
    return false
  }
}
