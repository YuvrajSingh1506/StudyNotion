import { profileEndpoints } from "../api";
import {toast} from 'react-hot-toast';
const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints;
const {GET_INSTRUCTOR_DATA_API} = profileEndpoints;
import { apiConnector } from "../apiconnector";
export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");

    // console.log(GET_USER_ENROLLED_COURSES_API)
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data;
    // console.log(result,"sdj");
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result;
}
export async function getInstructorData(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null ,
        {
        Authorization: `Bearer ${token}`,
        }
       );
       console.log("GET_INSTRUCTOR_API_RESPONSE", response);
       result = response?.data?.courses;
    }catch(err){
      console.error("GET INSTRUCTOR API ERROR",err);
      toast.error("Could not get instructor data");
    }
    toast.dismiss(toastId);
    return result;
}