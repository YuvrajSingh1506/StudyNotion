import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { send } from "vite";
import { sendOTP,signUp} from "../services/operation/authAPI";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RxCountdownTimer } from "react-icons/rx";
const VerifyEmail = () => {
    const {signupData, loading} = useSelector((state) => state.auth);
    const [otp, setOTP] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[]);
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }
    return(
        <div className="flex flex-col justify-center items-center text-white h-screen  w-screen">
            {
                loading?(<div>
                    Loading...
                    </div>):
                    (
                    <div className="w-3/12 max-w-maxContent mx-auto flex gap-4 flex-col">
                        <h1  className='text-3xl font-semibold'>Verify Email</h1>
                        <p className='text-richblack-300 text-md mb-2 '>
                            A verification code has sent to you. Enter the code below
                        </p>
                        <form onSubmit={handleOnSubmit}>
                               <OTPInput
                                           value={otp}
                                           onChange={setOTP}
                                           numInputs={6}
                                           renderInput={(props) => (
                                             <input
                                               {...props}
                                               placeholder="-"
                                               style={{
                                                 boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                               }}
                                               className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                             />
                                           )}
                                           containerStyle={{
                                             justifyContent: "space-between",
                                             gap: "0 6px",
                                           }}
                                         />
                             <button type="submit" className='mt-5 w-full rounded-md text-richblack-900 bg-yellow-50 text-sm py-2 font-semibold hover:scale-95 transition-all duration-200'>
                                Verify Email
                             </button>
                        </form>
                        <div className="flex w-full items-center justify-between">
                            <Link to='/login'>
                                <div className='flex gap-1 items-center text-richblack-100  text-sm'>
                                    <IoIosArrowRoundBack className='text-xl'/>
                                    <p>Back to Login</p>
                                </div>
                            </Link>  
                               <button className="flex items-center text-blue-100 gap-x-2"
                                onClick={() => dispatch(sendOTP(signupData.email))}>
                                <RxCountdownTimer />
                                Resend it
                            </button>
                        </div>
                    </div>
                    )
            }
        </div>
    )
}
export default VerifyEmail;