import React, { useState } from 'react'
import { FaEye, FaEyeLowVision } from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operation/authAPI';
import { Link, useNavigate } from 'react-router-dom';
const action  = ["Student","Instructor"];
const LoginForm = () => {
    const [formData, setFormData] = useState({
        email :"",password :"",accountType:"Student"
    })
    const[actor,setActor] = useState("Student");
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
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
        const{
            email,
            password
        } = formData;
        dispatch(login(email, password, navigate));

    }
 return (
    <div>
        <form onSubmit={handleOnSubmit}>
        <div className='flex flex-col gap-5 mt-10'>
            
                  <div className='  mt-3 w-fit flex items-center gap-2 bg-richblack-700 rounded-full p-1 text-richblack-300'>
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
        
            <div className='flex flex-col text-white text-lg gap-3'>
                <div>Email Address<sup className="text-pink-200">*</sup></div>
                <input type="email" name="email" id="email" value={formData.email} onChange={changeFormData}
                className='bg-richblack-800 py-2 px-2 rounded-md border-b-1' placeholder='Enter email address'/>
            </div>
            <div className='flex flex-col text-white text-lg gap-3 relative'>
                <div>Password<sup className="text-pink-200">*</sup></div>
                <input type={`${visible? "text" : "password"}`} name="password" id="email" value={formData.password} onChange={changeFormData}
                className='bg-richblack-800 py-2 px-2 rounded-md border-b-1 ' placeholder='Enter Password'/>
                <div className='absolute bottom-6 right-4' onClick= {()=> setVisible(!visible)}>
                    {
                        !visible ? <FaEyeLowVision/> :<FaEye/>
                    }
                </div>
                <Link to="/forgot-password">
                    <div className='text-blue-200 hover:text-blue-500 text-xs 
                    font-semibold absolute right-0 -bottom-3 transition-all duration-200'>
                        Forgot Password
                    </div>
                </Link>
            </div>
            <button className='mt-10 w-full rounded-md bg-yellow-50 text-sm py-2 font-semibold hover:scale-95 transition-all duration-200 ' type="submit">
                 Sign in
            </button>
            <div className='h-20'></div>
        </div>
        </form>
    </div>
  )
}
export default LoginForm;