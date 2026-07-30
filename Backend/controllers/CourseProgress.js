const CourseProgress = require("../models/CourseProgress");

const SubSection = require("../models/SubSection");
exports.updateCourseProgress = async(req, res) =>{ 
    const {courseId , subSectionId} = req.body;
    const userId = req.user.id;
    try{
        
        const subSection = SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(400).json({
                success : false,
                error : "Invalid Subsection "
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseId : courseId,
            userId : userId,
        })
        console.log("courseProgress" , courseProgress);
        if(!courseProgress){
            return  res.status(404).json({
                success : false,
                message : "Course progress doen't exists",
            })
        }
        else{
           
            if(courseProgress.completedVideo.includes(subSectionId)){
                return res.status(400).json({
                    success : false,
                    error : "Subsection already completed",
                })
            }
            courseProgress.completedVideo.push(subSectionId);
        }
        const result = await courseProgress.save();
        return res.status(200).json({
            success : true,
            message : "Course Progress updated successfully",
            data : result,
        })
       
    }catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : "Internal Server error",
            error : err.message,
        })
    }
}