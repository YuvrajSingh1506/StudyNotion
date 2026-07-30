import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operation/authAPI';
import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }   
    return (
    <div className='flex flex-col justify-center items-center text-white h-screen  w-screen'>
    {
        loading ?(<div className=''>Loading...</div>):
        (<div className='w-3/12 max-w-maxContent mx-auto flex gap-6 flex-col'>
            <h1 className='text-3xl font-semibold'>{
                    !emailSent ? "Reset your password" :"Check your email"
                }
            </h1>
            <p className='text-richblack-300 text-md mb-2'>
                {
                    !emailSent ? "Have no fear. We'll email you instructions to reset your password. If don't have access to your email we can try account recovery ":
                     `We have sent the email  to ${email}`

                }
            </p>

            <form onSubmit={handleOnSubmit}>
                {
                    !emailSent && (
                    <label htmlFor="">
                        <p className='text-richblack-300 mb-2'>Email Address<span className='text-red-700'>*</span></p>
                        <input type="email"
                        required
                        name = 'email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Enter your Email Address'
                        className='w-full p-2 rounded-md border-0 mb-4'
                        />
                    </label>
                    )
                 }
                <button type="submit" className='mt-5 w-full rounded-md text-richblack-900 bg-yellow-50 text-sm py-2 font-semibold hover:scale-95 transition-all duration-200'>
                    {
                        !emailSent ? "Reset Password" : "Resend Email"
                    }
                </button>
            </form>
            <div>
                <Link to="/login">
                <div className='flex gap-1 items-center text-richblack-100 text-sm'>
                    <IoIosArrowRoundBack className='text-xl'/>
                    <p>Back to Login</p>
                </div>
                
                </Link>
            </div>
        </div>)
    }
    </div>
  )
}

export default ForgotPassword;
