const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
exports.createRating = async ( req, res)=>{
    try{
        const userId = req.user.id;
        const {courseId , review, rating} = req.body;
        if(!courseId || !review || !rating){
             return res.status(400).json({
                success : false,
                message : "Missing fields"
            })
        }
        const courseDetails = await Course.findOne(
                                {_id : courseId,
                                studentsEnrolled : {$elemMatch :{$eq : userId}}
                                }
                            ) ;
        if( !courseDetails){
            return res.status(404).json({
                success: false,
                message : "Student not enrolled in course",
            })
        }                    
        const alreadyReviewed = await RatingAndReview.findOne({user : userId, course : courseId})
        if(alreadyReviewed){
            return res.status(403).json({
                success : false,
                message : "Student Already reviewed the course",
            })
        }
        const reviewCourse = await RatingAndReview.create({
                        user : userId,
                        course :    courseId,
                        rating,
                        review
        })
        const updateCourse = await Course.findByIdAndUpdate(
                            courseId,
                            {
                                $push:{
                                    ratingAndReviews:reviewCourse._id,
                                }
                            },
                            {new : true},
        )
        console.log(updateCourse);
        res.status(200).json({
            success : true,
            message : "Review and Rating is done on the course",
            reviewCourse,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message  : "Something went wrong while creating rating and review",
            error : err.message,
        })
    }
}

exports.getAverageRating = async ( req, res) => {
    try{
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success : false,
                message : "Course not found"
            })
        }
            const result = RatingAndReview.aggregate([
                {
                    $match:{
                        course : new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group : {
                        _id : null,
                        averageRating : { $avg : "$rating"}, 
                    },
                },

            ])
            if(result.length > 0){
                return res.status(200).json({
                    success : true,
                    averageRating : result[0].averageRating, 
                })
            }
            res.status(200).json({
                success : true,
                averageRating : 0,
                message : "Average rating is 0, no rating till now",
            })
    }catch(err){
         console.log(err);
        res.status(500).json({
            success : false,
            message  : "Something went wrong while getting avreage rating",
            error : err.message,
        })
    }
}

//get all rating
exports.getAllRating = async(req, res)=>{
        try{
            const allReview = await RatingAndReview.find({})
            .sort({rating : "desc"})
            .populate([
                {path : "user",
                select : "firstName lastName email image",
                },
                {path :"course",
                select :"courseName",
                }
            ]);
            return res.status(200).json({
                success : true,
                message : "All review fetch successfully",
                data : allReview,
            });
        }catch(err){
             console.log(err);
        res.status(500).json({
            success : false,
            message  : "Something went wrong while getting all rating",
            error : err.message,
        })
        }
}