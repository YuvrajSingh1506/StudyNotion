import React from 'react'
import {useState} from 'react';
import { FaEye, FaEyeLowVision } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import countryCode from '../../../data/countrycode.json';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../slice/authSlice';
import { sendOTP } from '../../../services/operation/authAPI';
const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const action  = ["Student","Instructor"];
    const [actor,setActor] = useState("Student");
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false); 
    const[formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        contactNumber:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType:"Student",
        countryCode:"+91",
    })
    function changeFormData(e){
        setFormData((prev) => {
            return{
                ...prev,
                [e.target.name] : e.target.value,
            }
        })
    }
    function updateActor(element){
        setActor(element);
        setFormData((prev)=>{
            return{
                ...prev,
                ["accountType"] : element,
            }
        })
    }
    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(setSignupData(formData));
        dispatch(sendOTP(formData.email));
        navigate("/verify-email");
    }
  return (
    <div>
        <div className='flex flex-col gap-5 mt-3 w-full text-[1.224rem]'>
            <div className='mt-10 w-fit flex items-center gap-2 bg-richblack-700 rounded-full p-1 text-richblack-300'>
                        {   
                            action.map((element,index)=>{
                                return(
                                    <div className={`py-2 px-6 text-lg rounded-full ${actor == element ?"bg-richblack-900 text-white":" text-richblack-300 bg-richblack-700"}
                                    transition-all duration-200 `}
                                    onClick = {() =>updateActor(element)} key = {index}>{element}</div> 
                                )
                            })
                        }
            </div> 
            <form onSubmit={handleOnSubmit}>        
            <div className='flex flex-col gap-5  text-white text-lg gap-3 w-full' >
                <div className='flex gap-5 w-fit'>
                    <div className='flex flex-col gap-2'>
                        <div>First Name<sup className="text-pink-200">*</sup></div>
                        <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={changeFormData}
                        className='bg-richblack-800 py-2 px-2 rounded-md border-b-1 ' required placeholder='Enter first Name'/>
                    </div>
                    <div className='flex flex-col gap-2 w-fit'>
                        <div>Last Name<sup className="text-pink-200">*</sup></div>
                        <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={changeFormData}
                        className='bg-richblack-800 py-2 px-2 rounded-md border-b-1'  required placeholder='Enter last Name'/>
                    </div>
                </div> 
                <div className='flex flex-col gap-2 w-full'>
                    <div>Email Address<sup className="text-pink-200">*</sup></div>
                    <input type="email" name="email" id="email" value={formData.email} onChange={changeFormData}
                    className='bg-richblack-800 py-2 px-2 rounded-md border-b-1' required placeholder='Enter email address'/>
               </div>
               <div className='flex flex-col gap-2 w-full'>
                    <div>Phone Number<sup className="text-pink-200">*</sup></div>
                    <div className='flex gap-5 items-center w-full text-richblack-300'>
                            <select name="countryCode" id="" value ={formData.countryCode}  onChange={changeFormData}
                             required className='bg-richblack-800 px-3 py-[.67rem] flex items-center justify-center rounded-md border-b-1 w-[18%]'>
                                {
                                    countryCode.map((element,index)=>{
                                        return(
                                            <option value={element.code} key={index} className=''>{element.code}</option>
                                        )
                                    })
                                }
                            </select>
                             <input type="tel" name="contactNumber" id="email" value={formData.contactNumber} onChange={changeFormData}
                            required className='bg-richblack-800 py-2 px-2 rounded-md border-b-1 w-[80%] removeCounter' placeholder='Enter contact number'/>
                    </div>
               </div>
                <div className='flex gap-5'>
                    <div className='flex flex-col text-white text-lg gap-3 relative'>
                               <div>Create Password<sup className="text-pink-200">*</sup></div>
                               <input type={`${visiblePassword? "text" : "password"}`} name="password" id="email" value={formData.password} onChange={changeFormData}
                               required className='bg-richblack-800 py-2 px-2 rounded-md border-b-1 ' placeholder='Enter Password'/>
                               <div className='absolute bottom-3 right-4' onClick= {()=> setVisiblePassword(!visiblePassword)}>
                                   {
                                       !visiblePassword ? <FaEyeLowVision/> :<FaEye/>
                                   }
                               </div>
                </div>
                 <div className='flex flex-col text-white text-lg gap-3 relative'>
                                <div>Confirm Password<sup className="text-pink-200">*</sup></div>
                                <input type={`${visibleConfirm? "text" : "password"}`} name="confirmPassword" id="email" value={formData.confirmPassword} onChange={changeFormData}
                                required className='bg-richblack-800 py-2 px-2 rounded-md border-b-1 ' placeholder='Confirm Password'/>
                                <div className='absolute bottom-3 right-4' onClick= {()=> setVisibleConfirm(!visibleConfirm)}>
                                    {
                                        !visibleConfirm ? <FaEyeLowVision/> :<FaEye/>
                                    }
                                </div>
                </div>
                </div>
            </div>    
             <button className='mt-10 w-full rounded-md bg-yellow-50 text-sm py-2 font-semibold hover:scale-95 transition-all duration-200' type="submit" >
                    Create Account 
            </button>  
            </form>
             <div className='h-20'></div>
        </div>
       
    </div>
  )
}
export default SignUpForm;