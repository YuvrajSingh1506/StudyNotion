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
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials : true,
    })
)
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`App is listen on ${PORT}`);
});

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

dbConnect();

cloudinaryConnect();

