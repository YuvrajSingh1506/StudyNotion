const jwt  = require("jsonwebtoken");
require("dotenv").config();
//auth
exports.auth = async(req,res,next) =>{
       
        try{
            let token =
            req.header("Authorization")?.replace(/^Bearer\s+/, "").trim() ||
            req.cookies?.token ||
            req.body?.token ||
            req.header("Authorisation")?.replace(/^Bearer\s+/, "").trim();
            
            if (token && typeof token === "string") {
              token = token.replace(/^"(.*)"$/, '$1');
            }

            console.log("FINAL TOKEN:", token);
            if(!token){
                return res.status(401).json({
                    success : false,
                    message : "token is missing",
                })
            }
            try{
                const decode = jwt.verify(token,process.env.JWT_SECRET);
                console.log("jdkfw",decode);
                req.user = decode;
            }catch(err){
                   console.log("JWT ERROR NAME:", err.name);
                    console.log("JWT ERROR MESSAGE:", err.message);
                return res.status(401).json({
                    success: false,
                    message :"token is invalid",
                    err : err.message,
                })
            }
            next();
        }catch(err){
            console.log(err);
            res.status(401).json({
                success : false,
                message : "Something went wrong while validating the token",
            })
        }
    }
//student

    exports.isStudent = async(req,res,next)=>{
        try{
            if(req.user.accountType !== "Student"){
                return res.status(403).json({
                    success:false,
                    message : "THis is protected routes for Student only"
                })
            }
            next();
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "User role connot be verified, please try again"
            })
        }
    }
//instructor
    exports.isInstructor = async(req,res,next)=>{
        try{
            if(req.user.accountType !== "Instructor"){
                return res.status(403).json({
                    success:false,
                    message : "This is protected routes for Instructor only",
                })
            }
            next();
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "User role connot be verified, please try again"
            })
        }
    }
//admin

  exports.isAdmin = async(req,res,next)=>{
        try{
            if(req.user.accountType !== "Admin"){
                return res.status(403).json({
                    success:false,
                    message : "This is protected routes for Admin only"
                })
            }
            next();
        }catch(err){
            return res.status(500).json({
                success : false,
                message : "User role connot be verified, please try again"
            })
        }
    }