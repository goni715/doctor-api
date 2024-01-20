const nodemailer = require('nodemailer');

const SendEmailUtilityTwo= async (EmailTo, EmailText, EmailSubject, ResetURL) => {

        //transporter
        let transporter = await nodemailer.createTransport({
            host: "mail.teamrabbil.com",
            port: 587,
            secure: false,
            auth: {
                user: "info@teamrabbil.com",
                pass: '~sR4[bhaC[Qs'
            },
            tls: {
                rejectUnauthorized: false
            }
        })



        let mailOptions = {
            from: 'Exchange MERN <info@teamrabbil.com>',
            to: EmailTo,
            subject: EmailSubject,
            text: EmailText,
            html: ResetURL, // html body
        };

        return await transporter.sendMail(mailOptions)
}
module.exports=SendEmailUtilityTwo
