const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const dbConnect = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cors = require("cors");

const app = express();

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

app.use(express.json());
app.use(cookieParser());

// 1. UPDATE CORS ORIGIN
// Add your Vercel frontend URL to the origin array
app.use(
    cors({
        origin: ["http://localhost:3000", "https://study-notion-ten-ashen.vercel.app"],
        credentials : true,
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running....'
    });
});

dbConnect();
cloudinaryConnect();

// 2. CONDITIONALLY LISTEN
// Only run app.listen if you are running locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, ()=>{
        console.log(`App is listen on ${PORT}`);
    });
}

// 3. EXPORT THE APP FOR VERCEL
module.exports = app;