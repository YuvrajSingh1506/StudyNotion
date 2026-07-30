const cloudinary = require("cloudinary").v2;
exports.uploadImageToCloudinary = async(file, folder, height, quality) =>{
    const options = {
        folder,
        transformation : []
    };
    if(height){
        options.transformation.height = height;
    }
    if(quality){
        options.transformation.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options); 
}