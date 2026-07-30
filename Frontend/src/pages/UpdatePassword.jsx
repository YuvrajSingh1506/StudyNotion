
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operation/authAPI";
import { IoIosArrowRoundBack } from "react-icons/io";
const UpdatePassword = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const [formData, setFormData] = useState({
        password : "",
        confirmPassword : ""
    })
    const {password, confirmPassword} = formData;
    const loading = useSelector((state) => state.auth.loading);
    function handleOnChange(e){
        setFormData((prev)=>{
            return{
                ...prev,
                [e.target.name] : e.target.value,
            }
        })
    }
    const handleOnSubmit= (e)=>{
    
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div onSubmit={handleOnSubmit} className="flex flex-col justify-center items-center text-white h-screen  w-screen">
            {
                loading ? (<div>Loading...</div>)
                 : (<div className="w-3/12 max-w-maxContent mx-auto flex gap-4 flex-col">
                    <h1 className='text-3xl font-semibold'>Choose New Password</h1>
                    <p className='text-richblack-300 text-md mb-2 '>
                        Almost done. Enter your new password and we will get you back on track.
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className="relative">
                            <p className='text-richblack-300 mb-2'>New Password<span className='text-red-700'>*</span></p>
                                <input type={showPassword ? ( "text"):("password") } 
                                name = "password"
                                value = {password}
                                placeholder="Enter you password"
                                className='w-full p-2 rounded-md border-0 mb-4 relative'
                                onChange = {handleOnChange} />
                                <span onClick = {()=> setShowPassword((prev) => !prev)} className="absolute bottom-0 right-3 text-lg">
                                    {
                                        showPassword ?( <AiFillEyeInvisible/>):(<AiFillEye/>)
                                    }
                                </span>
                        </label>
                        <label htmlFor="" className="relative">
                            <p className='text-richblack-300 mb-2'>Confirm New Password <span className='text-red-700'>*</span></p>
                            <input type={showConfirmPassword ? ( "text"):("password") } 
                                name = "confirmPassword"
                                value = {formData.confirmPassword}
                                placeholder="Confirm password"
                                onChange = {handleOnChange}
                                className='w-full p-2 rounded-md border-0 mb-4 relative' />
                                <span onClick = {()=> setShowConfirmPassword((prev) => !prev)} className="absolute bottom-0 right-3 text-lg">
                                    {
                                        showConfirmPassword ?( <AiFillEyeInvisible/>):(<AiFillEye/>)
                                    }
                                </span>
                        </label>
                        <button type = "submit" className='mt-5 w-full rounded-md text-richblack-900 bg-yellow-50 text-sm py-2 font-semibold hover:scale-95 transition-all duration-200'>
                                Reset Password        
                        </button>
                    </form>
                    <Link to='/login'>
                        <div className='flex gap-1 items-center text-richblack-100  text-sm'>
                            <IoIosArrowRoundBack className='text-xl'/>
                            <p>Back to Login</p>
                        </div>
                    </Link>
                 </div>)
            }    
        </div>
    )
    }
    export default UpdatePassword;