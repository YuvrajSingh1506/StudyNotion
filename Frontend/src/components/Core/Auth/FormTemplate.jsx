import React from 'react'
import Frame from "../../../assets/Images/frame.png"
import CTAButton from "../Homepage/CTAButton";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
// import { useState } from 'react';

const FormTemplate = ({heading, isLogin,LoginImage}) => {
  return (
    <div>
            <div className=' w-11/12 max-w-maxContent flex gap-40 justify-evenly mt-30 items-start bg-richblack-900 mx-auto'>
                <div className='flex flex-col w-[535px]'>
                    <div className='text-4xl font-semibold text-white'>{heading}</div>
                    <div className="text-[17px] text-richblack-100 mt-5">Build skill for today, tommorow, and beyound  
                        <span className='text-cyan-500 italic'> Education to future proof your carrear </span>
                     </div> 
                    
                    <div className='w-full'>
                        {
                             isLogin ? <LoginForm /> : <SignUpForm/>
                        }   
                    </div> 
                    
                  
                </div>
                <div className='relative'>
                    <img src={LoginImage} alt="" className='absolute -translate-y-5 -translate-x-5' loading='lazy'/>
                    <img src={Frame} alt="" className='z-0' loading='lazy'/>
                </div>
            </div>
    </div>
  )
}
export default FormTemplate;