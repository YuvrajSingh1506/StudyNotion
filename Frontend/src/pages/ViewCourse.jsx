import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { getFullDetailsOfCourse } from '../services/operation/courseDetailAPI'
import CourseReviewModal from '../components/Core/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/Core/ViewCourse/VideoDetailsSidebar'
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../slice/viewCourseSlice'

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(null)
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)

      dispatch(
        setCourseSectionData(courseData?.courseDetails?.courseContent)
      )
      dispatch(setEntireCourseData(courseData?.courseDetails))
      dispatch(setCompletedLectures(courseData?.completedVideos))

      let lectures = 0

      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })

      dispatch(setTotalNoOfLectures(lectures))
    }

    setCourseSpecificDetails()
  }, [])

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] overflow-hidden bg-richblack-900 text-richblack-5">

      {/* Sidebar */}
      <div className="w-[320px] shrink-0 border-r border-richblack-700 bg-richblack-800">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      {/* Main Content */}
      <div className="h-full flex-1 overflow-y-auto">
        <div className="mx-auto min-h-full w-11/12 max-w-[1100px] py-8">

          <div className="rounded-xl bg-richblack-800 p-6 shadow-lg">
            <Outlet />
          </div>

        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </div>
  )
}

export default ViewCourse