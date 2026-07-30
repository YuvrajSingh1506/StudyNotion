const mongoose = require("mongoose");
const {mailSender} = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
        email :{
            type : String,
            required : true,
        },
        otp : {
            type : String,
            required : true,
        },
        createdAt : {
            type : Date,
            default : Date.now,
            expires : 5 * 60,
        }
})
async function sendVerificationEmail(email,otp){
    try{
        const htmlContent = otpTemplate(otp)
        const mailResponse = await mailSender(email,"Verification from StudyNotion",htmlContent);
        console.log("Mail sent successfully" , mailResponse);
    }catch(err){
        console.error("Email verification error ", err);
        throw err;

    }
}
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    
})
module.exports = mongoose.model("OTP",OTPSchema);