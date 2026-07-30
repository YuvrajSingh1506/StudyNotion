import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay , Navigation} from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import ReactStarsRaw from 'react-stars';
const ReactStars = ReactStarsRaw.default || ReactStarsRaw;
import { ratingEndpoints } from '../../services/api';
// import ReactStars from 'react-rating-stars-component';   
import { apiConnector } from '../../services/apiconnector';
import { FaStar } from 'react-icons/fa';
const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(()=>{
    // console.log("review silder")
      const fetchAllReviews = async ()=>{
        // console.log("Before Call");
        const {data} = await apiConnector("GET", ratingEndpoints.REVIEW_DETAILS_API);
        console.log(data?.data);
        if(data?.success){
          setReviews(data?.data);
        }

      } 
      fetchAllReviews();
  }, []);
  return (
    <div className='text-white w-full'>
       <div className='h-[190px] max-w-maxContent'>
           <Swiper
              slidesPerView={4}
              spaceBetween={24}
              loop = {true}
              freeMode = {true}
              autoplay = {{
                delay : 2500,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className='w-full'
            >
                {
                  reviews.map((review, index) => (
                     <SwiperSlide key = {index}>
                        <img
                          src = {review?.user?.image ?  review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                          alt = "Profile pic"
                          className='h-9 w-9 object-cover rounded-full'
                        />
                        <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                        <p>{review?.course?.courseName}</p>
                        <p>
                          {
                            review?.review?.split(" ").slice(0, 15).join(" ")
                          }
                        </p>
                        <p>
                          {review?.rating?.toFixed(1)}

                        </p>
                        <ReactStars
                          count = {5}
                          value = {review?.rating || 0}
                          size = {20}
                          edit = {false}
                          activeColor = "#ffd700"
                         
                        />
                     </SwiperSlide>
                  ))
                }
            </Swiper>
       </div>
    </div>
  )
}
export default ReviewSlider