import React from 'react'
// import { useState } from 'react';
import LoginImage from "../assets/Images/signup.webp"
import FormTemplate from '../components/Core/Auth/FormTemplate';
const SignUp = () => {
    return(
        <FormTemplate isLogin = {false} heading={"Join the million learning to code with StudyNotion for free"} LoginImage = {LoginImage}/>
    )
}
export default SignUp;