import { createTransport } from 'nodemailer'

export async function sendMail({to, subject, body}: {to: string, subject: string, body: string}) {

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env
    const transport = createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    })

    try {
        const testResult = await transport.verify()
        console.log(testResult)
    } catch (error) {
        console.log(error)
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to, 
            subject,
            html: body
        })
        if(!sendResult.rejected[0] && sendResult.accepted[0]){
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}