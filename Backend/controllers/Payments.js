const User = require("../models/User");
// const razort
const crypto = require("crypto");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const {mailSender} = require("../utils/mailSender");
const {courseEnrollmentEmail, paymentSuccessEmail} = require("../mail/templates/courseEnrollementEmail");
const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

exports.capturePayment = async(req,res)=>{
        const userId = req.user.id;
        const {courses} = req.body;
        if(courses.length === 0){
            return res.status(400).json({
                success: false,
                message :"Please provide Course Id",
            })
        }
        let totalAmount = 0;
        for(const course_id of courses){
            let course;
            try{
                course  = await  Course.findById(course_id);
                if(!course){
                    return res.success(200).json({
                        success:false,
                        message :"Course not found",
                    })
                }
                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(500).json({
                        success : false,
                        message :"User already enrolled in the course"
                    })
                }
                totalAmount += course.price;

            }catch(err){
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message : "Something went wrong",
                    error : err.message,
                })
            }
           
        }
         const options = {
                amount : totalAmount * 100,
                currency : "INR",
                receipt : Math.random(Date.now()).toString(),
            }
            try{
                const paymentResponse = await instance.orders.create(options);
                return res.status(200).json({
                    success : true,
                    message : paymentResponse,
                })
            }catch(err){
                console.error(err);
                return res.status(500).json({
                    success : false,
                    message : "Payment order not Initiated",
                    error : err.message,
                })
            }
  
}
exports.verifyPayment = async( req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(500).json({
            success : false,
            message :"Payment Failed",
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id; 
    const expectedSignature = crypto
                            .createHmac("sha256",process.env.RAZORPAY_SECRET)
                            .update(body.toString())
                            .digest("hex");
        if(expectedSignature === razorpay_signature){
            //enroll the student
            await enrollStudents(courses,userId,res);

            //return re
            return res.status(200).json({
                success:true,
                message :"Payment verified",

            })
        }
        return  res.status(200).json({
            success: false,
            message :" Payment failed",
        })


}
const enrollStudents = async(courses,userId,res) =>{
    if(!courses || !userId){
        return res.status(400).json({
            success : false,
            message : "Please provide data for Courses of UserId",
        })
    }
    for(let courseId of courses){
       try{
            const course = await Course.findByIdAndUpdate(
                    courseId,
                    {
                        $push:{
                            studentsEnrolled : userId
                        }
                    },
                    {new : true}
            );
            if(!course){
                return res.status(400).json({
                    success : false,
                    message : "Course not found",
                })
            }
            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId : userId,
                completedVideo:[],
            })
            const enrollStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push:{
                        courses : courseId,
                        courseProgress : courseProgress._id,
                    }
                },
                {new:true},
            );
            if(!enrollStudent){
                return res.status(400).json({
                    success : false,
                    message : "User not found",
                })
            }
            // console.log("res",res);
            const sendData = courseEnrollmentEmail(res.courseName,enrollStudent.firstname + " " +enrollStudent.lastName);
            const emailResponse = await mailSender(enrollStudent.email,
                `Successfully enrolled into ${res.courseName}`,
                sendData,
            )
            console.log("Email Sent successfully " ,emailResponse.response);
        }catch(err){
            return res.status(500).json({
                success : false,
                message : err.message
            })
        }
    }
  
}
exports.sendPaymentSuccessEmail =async(req, res)=>{
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;
    console.log("orderos",orderId);
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success : false,
            message :"Please provide all the fields",
        })
    }
    try{
        const enrollStudent = await User.findById(userId);
        const data =  paymentSuccessEmail(`${enrollStudent.firstname}`,
                amount/100,
                orderId,
                paymentId,
            )
        await mailSender(
            enrollStudent.email,
            `Payment Recived`,
            data
        )
    }catch(err){
        console.log("Error in sending mail");
        return res.status(500).json({
            success : false,
            message :"Could not send mail",
        })
    }
}
// for Single Payment
// exports.capturePayment = async( req, res) =>{
//     try{
//         const {course_id} = req.body;
//         const userId = req.user.id;
//         if(!course_id){
//             return res.status(400).json({
//                 success : false,
//                 message : "Please provide valid course Id",
//             })
//         }
//         let course;
//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.json({
//                     success : false,
//                     message :"Could not find the course"
//                 })
//             }
//         }catch(err){
//             return res.json({
//                 success : false,
//                 message : "Someting went wrong while fetching course detail"
//             })
//         }
//         //why this
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.json({
//                 success : false,
//                 message :"Student already enrolled"
//             })
//         }

//         //order created 

//         const amount = course.price;
//         const currency = "INR";
//         const options = {
//             amount : amount * 100,
//             currency : currency,
//             receipt : Math.random(Date.now()).toString(),
//             notes : {
//                 courseId : course_id,
//                 userId
//             }
//         }
//         try{
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);
//             return res.status(200).json({
//                 success : true,
//                 courseName : course.courseName,
//                 courseDescription : course.courseDescription,
//                 thumbnail : course.thumbnail,
//                 orderId : paymentResponse.id,
//                 currency : paymentResponse.currency,
//                 amount : paymentResponse.amount,
//             })
//         }catch(err){
//             console.log(err);
//             res.json({
//                 success : false,
//                 message : "Could not initiate order",
//                 error : err.message
//             })
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             success : false,
//             message : "Someting went wrong while creating order for payment",
//             error : err.message,
//         })
//     }
// }

// exports.verifySignature = async (req, res) => {
//         const webhookSecret = "12345678";
//         const signature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256",webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");
//         if(signature === digest){
//             console.log("Payment is authorized");
//             const {courseId, userId} = req.body.payload.payment.entity.notes;
//             try{    
//                 const courseUpdate = await Course.findByIdAndUpdate(
//                     courseId,
//                     {
//                         $push:{
//                             studentsEnrolled : userId,
//                         }
//                     },
//                     {new : true},
//                 )
//                 if(!courseUpdate){
//                     return res.status(500).json({
//                         success : false,
//                         message : "course not found"
//                     })
//                 }
//                 console.log(courseUpdate);
//                 const userUpdate = await User.findOneAndUpdate(
//                                         {_id : userId},
//                                         {
//                                             $push:{
//                                                 courses : courseId,
//                                             }
//                                         },  
//                                         {new : true},
//                                     )
//                 console.log(userUpdate);

//                 // const mailContent = paymentSuccessEmail(name, amount, orderId, paymentId)
//                 const emailResponse = await mailSender(userUpdate.email,
//                                                 "Congratulation from StudyNotion",
//                                                 mailContent,
//                                             );
                                            
//                  console.log(emailResponse);
//                  res.status(200).json({
//                     success : true,
//                     message : "Sinature Verifed and Course Added",
//                  })                           
//             }catch(err){
//                 console.log(err);
//                 return res.status(500).json({
//                     success : false,
//                     message : err.message
//                 })
//             }
//         }
//         else{
//             res.status(400).json({
//                 success : false,
//                 message : "Invalid request",
//             })
//         }
    
// }