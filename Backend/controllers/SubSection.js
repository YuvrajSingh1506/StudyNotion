const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
// const cloudinary = require("cloudinary");
require("dotenv").config();
const {uploadImageToCloudinary} = require("../utils/imageUploader");
exports.createSubSection = async (req, res) => {
    try{
        const {sectionId, title, description} = req.body;
        const video = req.files.video;
        // console.log("Sectuion Id", sectionId);
        // console.log("Sectuion Id TITLE", title);
        // console.log("Sectuion Id", description);
        // console.log("Sectuion Id", sectionId);
        if( !sectionId || !title  || !description || !video){
            return res.status(400).json({
                success : false,
                message : "All fields are required",

            })
        }
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title : title,
            description : description,
            timeDuration: `${uploadDetails.duration}`,
            videoURL : uploadDetails.secure_url,
        })
        const updateSection = await Section.findByIdAndUpdate(
                            sectionId,
                            {
                                $push:{
                                   subSection : subSectionDetails._id 
                                }
                            },
                            {new : true},
        ).populate("subSection");
        console.log(updateSection);
        res.status(200).json({
            success : true,
            message : "SubSection created successfully",
            updateSection,
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Something went wrong while creating subsection, please try again",
            error : err.message,
        })
    }
}


exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

//delete SubSection 
exports.deleteSubSection = async( req, res) =>{
    try{
        const {subSectionId, sectionId} = req.body;
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success : false,
                message : "Missing fields",
            })
        }
        await Section.findByIdAndUpdate(sectionId,{
            $pull:{
                subSection : subSectionId,
            }
        })
        const subSection = await SubSection.findByIdAndDelete(subSectionId);
        if(!subSection){
            return res.status(403).json({
                success : false,
                message : "Subsection not found",
            })
        }
        const updatedSection = await Section.findById(sectionId).populate("subSection");
        return res.status(200).json({
            success : true,
            message : " subsection deleted successfully",
            data : updatedSection
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Unable to delete Sub Section, please try again",
            error : err.message
        })  
    }
}

