import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay , Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Course_Card from './Course_Card';
const CourseSlider = ({Courses}) => {
    // console.log("Primt",Courses);
  return (
    <>
        {
             (Courses?.length) ? 
             (<Swiper
             loop={true}
             slidesPerView={1}
             spaceBetween={25}
             modules={[Pagination, Autoplay]}
             
             breakpoints={{
                1024:{slidesPerView:3},
                   
             }}
             className="max-h-[30rem]"
             >
                   {
                    Courses.map((course, index) =>(
                        <SwiperSlide key={index}>
                            {/* <div>{index}</div> */}
                            <Course_Card course = {course} Height={"h-[250px]"}/>
                        </SwiperSlide>
                    ))
                   }
             </Swiper>)
             :(<div className="text-xl text-richblack-5">No Course Found</div>)
        }
    </>
  )
}
export default CourseSlider;