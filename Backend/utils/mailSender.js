const nodeMailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async function(to,subject,html){
    try{
        const transporter = nodeMailer.createTransport({
            host : process.env.MAIL_HOST,
            auth :{
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        });
        const info = await transporter.sendMail({
        from :"StudyNotion",
        to,
        subject,
        html
        });
        console.log(info);
        return info;
    }catch(err){
        console.log(err);
        throw new Error("Error occurred while sending email");
    }
}