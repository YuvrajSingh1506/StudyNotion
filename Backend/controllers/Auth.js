const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpgenerator = require("otp-generator");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {mailSender} = require("../utils/mailSender");
const {passwordUpdate} = require("../mail/templates/passwordUpdate");
require("dotenv").config();
//SendOTP

    exports.sendOTP = async(req,res) =>{
        try{
            const {email} = req.body;
            const checkUserPresent = await User.exists({email});

            if(checkUserPresent){
                return res.status(401).json({
                    success : false,
                    message : "User already exists"
                })
            }
            var otp = otpgenerator.generate(6,{
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            })
            console.log("Otp generated" , otp);
            const result = await OTP.findOne({otp : otp});
            while(result){
                otp = otpgenerator.generate(6,{
                upperCaseAlphabets : false,
                lowerCaseAlphabets :false,
                specialChars : false,
                }) 
                result =  await OTP.findOne({otp : otp});  
            }
            const otpBody = await OTP.create({
                email,
                otp,
            });
            console.log(otpBody);
            res.status(200).json({
                success: true,
                message : "Otp sent successfully",
                otp,
            })

        }catch(err){
            console.log(err);
            res.status(500).json({
                success : false,
                error : "otp not generated",
                message : err.message
            })
        }
    }
//Signup

    exports.signUp = async(req,res) =>{
        try{
            const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;
            if(!firstName || !lastName || !email || !password || !confirmPassword 
                 || !otp){
                    return res.status(403).json({
                        success:false,
                        message : "All fields are required",
                    })
                }
             if(confirmPassword !== password){
                return res.status(400).json({
                    success : false,
                    message : "Password and Confirm Password value don't match, please try again",
                })
             }   
             const existingUser = await User.exists({email});
             if(existingUser){
                return res.status(400).json({
                    success:false,
                    message : "User already exists"
                })
             }
             const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
             console.log("Fetch otp " ,recentOtp);
             if(recentOtp.length === 0){
                return res.status(400).json({
                    success:false,
                    message : "OTP not found"
                })
             }else if(otp !== recentOtp[0].otp){
                return res.status(400).json({
                    success : false,
                    message :"Invalid OTP",
                    otp,
                    recentOtp,
                })
            }
            console.log("Profile created successsfully");
             const hashedPassword= await bycrpt.hash(password, 10);

             const profileDetails = await  Profile.create({
                gender : null,
                dateOfBirth : null,
                about : null,
                contactNumber : null,
             })
             const user = await User.create({
                firstName,
                lastName,
                email,
                password : hashedPassword,
                accountType ,
                additionalDetail : profileDetails._id,
                image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
             })

             res.status(200).json({
                success : true,
                user, 
                message : "User created Successfully",
             })

        }catch(err){    
            console.log(err);
            res.status(500).json({
                success:false,
                message : "User cannot be registered try again",
                error : err.message,
            })
        }
    }

//Login

    exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(403),json({
                success:false,
                message : "All fields are required, please try again",
            });
        }
        const  user = await User.findOne({email}).populate("additionalDetail");
        if(!user){ 
            return res.status(401).json({
                success:false,
                message : "User not found, please signup first",
            })
        }
        if(!await bycrpt.compare(password,user.password)){
            return res.status(401).json({
                success : false,
                message : "Password don't match "
            })
        }
        const payload = {
            email : user.email,
            id : user._id,
            accountType : user.accountType,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h"
        })
        user.token = token;
        user.password = undefined;
        const options = {
            expires : new Date(Date.now() + (3 * 24 * 60 * 60 * 1000) ),
            httpOnly : true,
        }
        res.cookie("token",token,options).status(200).json({
            success : true,
            token,
            user,
            message : "Logged in succcessfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Login failure, please try again",
            error :err.message,
        })
    }
}
//change Password is applied wen user is logged in and want to change password from profile page
exports.changePassword = async(req,res)=>{
        try{
            const id  = req.user.id;
            const {oldPassword, newPassword, confirmPassword} = req.body;
            if(!oldPassword || !newPassword || !confirmPassword){
                return res.status(403).json({
                    success : false,
                    message : "All fields are required, please try again",
                })
            }
            const user = await  User.findById(id);
            if(!user){
                return res.status(404).json({
                    success : false,
                    message : "User not found",
                })
            }
            if(!await bycrpt.compare(oldPassword,user.password)){
                return res.status(401).json({
                    success : false,
                    message : "Old password is incorrect",
                })
            }
            if(newPassword !== confirmPassword){
                return res.status(400).json({
                    success : false,
                    message : "New password and confirm password don't match",
                })
            };
            const hashedPassword = await bycrpt.hash(newPassword,10);
            const updatedUser = await User.findByIdAndUpdate(id,{
                password : hashedPassword,
            },{
                new : true,
            })     
            console.log(updatedUser);
            const htmlContent = passwordUpdated(updatedUser.email, updatedUser.firstName); 
            const mailSenderResult = await mailSender(user.email, "Password Updated",
                );
            console.log("Mail send result ", mailSenderResult);
            res.status(200).json({
                success : true,
                message : "Password updated successfully",
            })
        }catch(err){
            console.log(err);       
            res.status(500).json({
                success : false,
                message : "Error occurred while changing password, please try again",
            })  
        }
    }

