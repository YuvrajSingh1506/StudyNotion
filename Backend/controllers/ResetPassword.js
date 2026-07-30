const User = require("../models/User");
const {mailSender} = require("../utils/mailSender");
let bcrypt;
try {
  bcrypt = require("bcryptjs");
} catch {
  bcrypt = require("bcrypt");
}
const crypto = require("crypto");
exports.resetPasswordToken  = async(req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email : email});;
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found with this email"
            })
        }

        //crypto
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate(
                                    {email : email},
                                    {
                                        token,
                                        resetPasswordExpires : Date.now() + 5*60*1000,
                                    },
                                 { returnDocument: 'after' });   
        const url = `http://localhost:3000/update-password/${token}`;
        console.log("PASSWORD RESET URL", url);
        const response = await mailSender(email, "Password reset link",
                        `Password reset link : ${url}`);
            return res.json({
                success:true,
                message : "Email sent successfully, please check email and update password",
                data : response,
            })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "Error occurred while sendin reset password url",
            error : err.message,
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const {token, password, confirmPassword} = req.body;
        if( password !== confirmPassword){
            return res.json({
                success : false,
                message : "Password not matching",
            })
        }
        const userDetail = await User.findOne({token : token});
        if(!userDetail){
            return res.json({
                success : false,
                message :"token invalid",
            })
        }
        if( userDetail.resetPasswordExpires < Date.now()){
            return res.json({
                success : false,
                message : "token is expired, please try again"
            })
        }  
        const hashedPassword = await bcrypt.hash(password,10);
        const updateDetail = await User.findOneAndUpdate({token : token},
                                        {password : hashedPassword},    
                                        {new : true});
        return res.status(200).json({
            success : true,
            message : "Password update successfully"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message : "Something went wrong while updating password"
        })
    }
}