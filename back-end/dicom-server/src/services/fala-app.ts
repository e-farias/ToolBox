import { defaultExamNotificationMsg } from "../config"

export const sendWhatsAppMessage = async (
  phone: string,
  name: string,
  instanceName: string,
  file: string
) => {

  let success = false

  const endPoint = `${process.env.FALA_APP_API_BASE_URL}/send-whatsapp-message?token=${process.env.FALA_APP_TOKEN}`
  const body = JSON.stringify({
    sessionId: process.env.FALA_APP_SESSION_ID,
    customerId: process.env.FALA_APP_CUSTOMER_ID,
    phone,
    name,
    message: defaultExamNotificationMsg(name, instanceName),
    file
  }) 

  const response = await fetch(endPoint, {
    method: "POST",
    body,
  })

  if (response.ok) {

    if (response.status == 201) {
      success = true
    }
  
  } else {
    console.log('error: ❌ sendWhatsAppMessage\n')
  }

  console.log(
    `[FALA-APP] response (${phone}):\n`,
    JSON.stringify(await response.json(), null, 2)
  )

  return success

}