import React from 'react'
// import { useState } from 'react';
import LoginImage from "../assets/Images/login.webp"
import FormTemplate from '../components/Core/Auth/FormTemplate';
const Login = () => {
    return(
        <FormTemplate isLogin = {true} heading={"Welcome Back"} LoginImage={LoginImage}/>
    )
}
export default Login;