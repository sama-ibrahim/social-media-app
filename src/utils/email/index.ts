import nodemailer from "nodemailer";
import { devConfig } from "../../config/env/dev.config";
import { MailOptions } from "nodemailer/lib/sendmail-transport";


export const sendMail = async(mailOptions:MailOptions) =>{

   // transporter
   
    const transporter=nodemailer.createTransport({

        service:"gmail",
        auth:{
            user: devConfig.EMAIL_USER ,
            pass:devConfig.EMAIL_PASS
        },
         
    });
    mailOptions.from=`social-app<${devConfig.EMAIL_USER}`
  await transporter.sendMail(mailOptions)
};