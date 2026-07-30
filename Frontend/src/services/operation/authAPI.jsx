import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";
import { setLoading, setToken } from "../../slice/authSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slice/profileSlice";
import { resetCart } from "../../slice/cartSlice";

const {
    OTPSEND_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints
export const sendOTP = (email) => {
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try{
            console.log("EMAIL", email);
            const response = await apiConnector("POST",OTPSEND_API, {email})
            console.log("OTP SEND RESPOSNE",response)
            if(!response.data.success){
                throw new error(response.data.message);
            }
            toast.success("OTP Sent Successfully");
        }catch(err){
            console.log("OTP SENT ERROR", err);
            toast.error("Failed to Send OTP");
        }
        dispatch(setLoading(false));
    }
}
export const signUp = (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) => {
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try{
            // console.log("SIGNUP DATA", {accountType, firstName, lastName, email, password, confirmPassword, otp});
            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                accountType
            })
            console.log("USER ",response);
            if(!response.data.success){
                toast.error("user cannot be created");
                navigate("/signup");
                throw new error("USER CANNOT BE CREATED",response.data.message);
            }
            toast.success("User created successfully");
            navigate("/login");  
        }catch(err){
             console.log("USER ERROR", err);
            toast.error("Failed to create user");
        }
        dispatch(setLoading(false));
    }
}
export const login = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                LOGIN_API,
                { email, password }
            );

            if (!response.data.success) {
                toast.error("Login unsuccessful");
                throw new Error(response.data.message);
            }

            console.log("LOGIN RESPONSE", response);

            toast.success("Login Successfully");

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard/my-profile");

        } catch (err) {
            console.log("LOGIN ERROR", err);
            toast.error("Failed to Login");
        }

        dispatch(setLoading(false));
    };
};
export const logout = (navigate)=>{
    return (dispatch)=>{
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart());
        localStorage.removeItem("user");
        localStorage.removeItem("token")
        toast.success("Logged Out");
        navigate("/");
    }
}
export const getPasswordResetToken =  (email, setEmailSent) => {
        return async (dispatch) => {
            dispatch(setLoading(true));
            try{
                const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

                console.log("RESET PASSWORD TOKEN RESPONSE", response);
                if(!response.data.success){
                    throw new Error(response.data.message);
                }

                toast.success("Reset Email sent");
                setEmailSent(true);

            }catch(err){
                console.log("RESET PASSWORD TOKEN ERROR", err);
                toast.error("Failed to sent email Reset Password");
            }
            dispatch(setLoading(false));
        }
}
export const resetPassword = (password, confirmPassword, token) => {
        return async (dispatch) =>{
            dispatch(setLoading(true));
            try{
                const response = await apiConnector("POST", RESETPASSWORD_API,{password, confirmPassword, token});
                console.log("RESET PASSWORD ",response);
                  if(!response.data.success){
                    throw new Error(response.data.message);
                }

                toast.success("Password Updated Successfully");
            }catch(err){
                console.log("RESET PASSWORD  ERROR", err);
                toast.error("Failed to Reset Password");
            }
            dispatch(setLoading(false));
        }
}
// export { getPasswordResetToken };