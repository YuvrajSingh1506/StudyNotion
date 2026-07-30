const Course = require("../models/Course");
// const { findByIdAndUpdate } = require("../models/OTP");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { mongoose } = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secToDuration");
require("dotenv").config();
exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    const { courseName, courseDescription, whatYouWillLearn, price, category, tag : _tag, status, instructions:_instructions } = req.body;
    console.log(courseName);
    const thumbnail = req.files.thumbnailImage;
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !instructions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    const instructorDetails = await User.findById(userId);
    // console.log("Instructor Details", instructorDetails);  
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      })
    }
    //because tag id is stored in Course DB
    // const catId = new mongoose.Types.ObjectId(category);
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag details not found",
      })
    }
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
    // instructions = JSON.stringify(instructions); 
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      instructions,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,

    })
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id
        }
      },
      { new: true },
    )
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id
        }
      }
    )
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "failed to created course",
      error: err.message,
    })
  }
}

exports.editCourse = async (req, res) => {
  try {
    const { courseId, ...updates } = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files && req.files.thumbnailImage) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
      //   .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.showAllCourses = async (req, res) => {
  try {
    const course = await Course.find({
      status: "Published"
    },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    ).populate("instructor");
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetch successfully",
      data: course,
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      succes: false,
      message: "Can not fetch course data",
      error: err.message
    })
  }
}

exports.getCourseDetail = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course id not given"
      })
    }
    const courseDetail = await Course.findById(courseId).populate([
      {
        path: "instructor",
        populate: {
          path: "additionalDetail",
        }
      },
      {
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      },
      {
        path: "category"
      },
      // {
      //     path : "ratingAndReview"
      // },
    ])
      .lean();
    if (!courseDetail) {
      return res.status(400).json({
        success: false,
        message: `Course not found with CourseId : ${courseId}`,
      })
    }
    res.status(200).json({
      success: true,
      message: "Course detail fetch successfully",
      data: courseDetail,
    })

    //duration
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Course detail",
      error: err.message,
    })
  }
}

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    // console.log("Helllo",instructorId);
    const response = await Course.find({
      instructor: instructorId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Instructor courses are fetch successfully",
      data: response
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Instructor Course",
      error: err.message
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    //   console.log("on call",req.params); 
    const { courseId } = req.params;
    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    // Also remove the course from Category and Instructor
    // await Category.findByIdAndUpdate(course.category, {
    //   $pull: { course: courseId },
    // })
    // await User.findByIdAndUpdate(course.instructor, {
    //   $pull: { courses: courseId },
    // })

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const courseId = req.query.courseId;
    console.log("data center", courseId)
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
        .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data:{ 
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideo
          ? courseProgressCount?.completedVideo
          : [],
      }
      ,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
