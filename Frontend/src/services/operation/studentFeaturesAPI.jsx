import { studentEndpoints } from "../api"
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slice/courseSlice";
import { resetCart } from "../../slice/cartSlice";
import {toast} from 'react-hot-toast'
const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(scr){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = scr;
        script.onload = () =>{
            resolve(true);
        }
        script.onerror = () =>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}
export async function buyCourse(token, courses, userDetails, navigate, dispatch){
        const toastId = toast.loading("Loading...");
        try{
            //load the script
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
           
            if(!res){
                toast.error("RazorPay SDK failed to load");
                return;
            }
            const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
                Authorization :`Bearer ${token}`,
            })
            if(!orderResponse.data.success){
                throw new Error(orderResponse.data.message); 
            }
            console.log(orderResponse);
            // console.log("hellp",import.meta.env.VITE_RAZORPAY_KEY);
            const options = {
                key : import.meta.env.VITE_RAZORPAY_KEY,
                currency: "INR",
                amount :orderResponse.data.message.amount,
                order_id: orderResponse.data.message.id,
                name:"StudyNotion",
                description : "Thank you for Purchasing the course",
                image:rzpLogo,
                prefill:{
                    name : `${userDetails.firstName}`,
                    email : userDetails.email,

                },
                handler:async function(response){
                    //send successful email
                    await sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token);

                    //verify payment 
                    await verifyPayment({...response, courses}, token, navigate, dispatch);
                }
            }

            const paymentOptione = new window.Razorpay(options);
            paymentOptione.open();
            paymentOptione.on("payment.failed",function(response){
                toast.error("Payment Failed");
                console.log(response.error);
            })
        }catch(err){
            console.log("PAYMENT API ERROR ",err);
            toast.error("Could not make Payment");
        }
        toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId : response.razorpay_payment_id,
                amount,
            },
            {
                Authorization : `Bearer ${token}`,
            }

        )
    }catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR....",err);
    }
}
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API,
        bodyData,
        {
            Authorization: `Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are added to the Course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }catch(err){
        console.log("PAYMENT VERIFY ERROR...",err);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}