const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to db successfully");
    })
    .catch((err)=>{
        console.log('DB connection Failed');
        console.error(err);
    })
}
module.exports = dbConnect;