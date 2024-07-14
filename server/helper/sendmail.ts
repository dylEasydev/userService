import nodemailer, { Transporter } from 'nodemailer';

class Mailer {
    private _mail:string;
    private _password:string;
    private transporter:Transporter;

    constructor(mail:string,password:string){
        this._mail = mail;
        this._password = password;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port:587,
            secure:false,
            auth:{
                user: this._mail,
                pass: this._password
            },
            tls: {
                ciphers: 'SSLv3'
            }
        })
    }

    sendMail(destMail:string , msg:string , subject:string){
        return new Promise<void>((resolve, reject) => {
            const  mailOptions ={
                from:this._mail,
                to: destMail,
                subject,
                html:`<!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>auth Code</title>
                </head>
                <body>
                    <pre>
                        ${msg}
                    </pre>
                </body>
                </html>`
            }
            this.transporter.sendMail(mailOptions).then(()=>{
                resolve()
            }).catch(error => reject(error))
        })
    }
}

export default new Mailer(
    process.env.COMPANING_MAIl as string,
    process.env.PASSWORD_MAIL as string
)