const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose = require("mongoose");
exports.createCategory = async(req, res)=>{
    try{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            })
        }
        const categoryDetails = await Category.create({
            name : name,
            description : description,
        });
        console.log(categoryDetails);
        res.status(200).json({
            success : true,
            message : "Category created successfully",   
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message,
        })
    }
}

exports.showAllCategory = async (req, res) =>{
    try{
        const allTags = await Category.find({},{name : true, description : true, course : true});
        // console.log("category", allTags);
        res.status(200).json({
            success : true,
            message : "All tag return successfully",
            allTags,
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message, 
        })
    }
}

exports.categoryPageDetails = async(req, res)=>{
    try{
        const {catId} = req.body;
        const categoryId = new mongoose.Types.ObjectId(catId);
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path:"course",
            match : {status : "Published"},
            // populate :"ratingAndReview",
        });
        if(!selectedCategory){
            return res.status(404).json({
                success : false,
                message : "Data not found",
            })
        }
        const Categories = await Category.find({_id : {$ne : categoryId}}).populate({
                path : "course",
                match : {status : "Published"} , 
                populate:"instructor"
        });
        // console.log("Diffrent");
        const differentCategories = Categories.flatMap((course)=>course.course);

        // const topSelling  = await Course.find().sort({studentsEnrolled : -1}).limit(10);
      
        const mostSelling = await Category.find()
        .populate({
            path : "course",
            match : {status : "Published"},
            populate:{
                path:"instructor"
            }
        })
        
        const allCourses = mostSelling.flatMap((course) => course.course);
        const topSelling = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0 , 10);
        res.status(200).json({
            success : true,
            data : {
                selectedCategory,
                differentCategories  ,
                topSelling,
            },

        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : err.message,
        })
    }
}