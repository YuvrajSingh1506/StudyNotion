const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const mongoose = require("mongoose");

exports.createSection  = async(req, res) =>{
    try{
        const {sectionName, courseId} = req.body;
        if( !sectionName || !courseId){
            return res.status(400).json({
                success :false,
                message : "Missing properties",
            })
        }
        const newSection = await Section.create({
            sectionName,
        });
        const updateCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent : newSection._id,
                }
            },
            {new : true},
        ).populate({
            path : "courseContent",
            populate :{
                path : "subSection"}
        })
        return res.status(200).json({
            success : true,
            message : "Subsection created successfully",
            updateCourseDetails,
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "unable to  create section, please try again later",
            error : err.message,
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId,courseId } = req.body;
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();

        res.status(200).json({
            success: true,
            message: section,
            data:course,
        });
    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.deleteSection = async (req,res) =>{
    try{

        const {sectionId, courseId} = req.body;
        if(!sectionId || !courseId){
            return res.status(400).json({
                success : false,
                message : "Missing Properties",
            })
        }
        const section = Section.findById(sectionId);
        if(!section){
            return res.status(400).json({
                success : false,
                message : "Section not found"
            })
        }
        await SubSection.deleteMany({
            _id: { $in: section.subSection }
        });

        await Section.findByIdAndDelete(sectionId);
        //TODO : delection section from the course
        const result = await Course.findByIdAndUpdate(courseId,
            {   
                $pull:{
                    courseContent : sectionId,
                },
            },
            {new : true},
        )
        console.log("result of course after deletion", result);
        return res.status(200).json({
            success : true,
            message : "section deleted successfully",
            data : result,
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Unable to delete Section, please try again",
            error : err.message
        })  
    }
}