import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from "../AddCourse/RenderSteps"
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../../../services/operation/courseDetailAPI';
import { setEditCourse, setCourse } from '../../../../slice/courseSlice';
import { useState } from 'react';
 const EditCourse = () => {
    const dispatch = useDispatch();
    const courseId = useParams();
    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth); 
    useEffect(()=>{
        const populateCourseDetails = async() =>{
            setLoading(true);
            // console.log("from calling function", courseId.id);
            const result = await getFullDetailsOfCourse(courseId.id, token);
            console.log(result);
            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    },[])
    if(loading){
        return(
            <div>Loading</div>
        )
    }
  return (
    <div>
        <h1 className='text-3xl text-white font-medium mb-10'>Edit Course</h1>
        <div>
            {
                course ? (<RenderSteps/>) : (<div>Course Not Found</div>)
            }
        </div>
    </div>
  )
}
export default EditCourse;