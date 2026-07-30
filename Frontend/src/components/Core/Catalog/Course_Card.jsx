import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
const Course_Card = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews); 
        setAvgReviewCount(count);
        // console.log(course);
    },[course])
  return (
    <div>
        <Link to={`/course/${course._id}  `}>
            <div>
                <div className="rounded-lg">
                    <img
                        src= {course?.thumbnail}
                        alt= "Course Thumbnail"
                        className={`${Height} w-full rounded-md object-cover`}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {" "} {course?.instructor?.lastName}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={"20px"}/>
                        <span className="text-richblack-400">
                            {course?.ratingAndReviews?.length} Ratings
                            </span> 
                    </div>
                    <p className="text-xl text-richblack-5">Rs.{course?.price}</p>
                </div>

            </div>
        </Link>
    </div>
  )
}
export default Course_Card;