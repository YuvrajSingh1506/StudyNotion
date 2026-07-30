
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import CourseReviewModal from './CourseReviewModal'

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState('')
  const [videoBarActive, setVideoBarActive] = useState('')

  const navigate = useNavigate()
  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse)

  const location = useLocation()

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) {
        return
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
          (data) => data._id === subSectionId
        )

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-richblack-800 text-richblack-5">

      {/* Top Header */}
      <div className="border-b border-richblack-600 bg-richblack-800 p-5">

        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard/enrolled-courses')}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-richblack-200 transition-all duration-200 hover:text-yellow-50"
        >
          <span className="text-lg">←</span>
          Back to Courses
        </button>

        {/* Course Name */}
        <h2 className="line-clamp-2 text-lg font-semibold text-richblack-5">
          {courseEntireData?.courseName}
        </h2>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-richblack-300">
              Course Progress
            </span>

            <span className="font-semibold text-yellow-50">
              {completedLectures.length} / {totalNoOfLectures}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-richblack-600">
            <div
              className="h-full rounded-full bg-yellow-50 transition-all duration-300"
              style={{
                width: `${
                  totalNoOfLectures
                    ? (completedLectures.length / totalNoOfLectures) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Review Button */}
        <div className="mt-5">
          <IconBtn
            text="Add Review"
            onclick={() => setReviewModal(true)}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">

        {courseSectionData.map((sec, index) => (
          <div key={index} className="border-b border-richblack-700">

            {/* Section Header */}
            <button
              onClick={() => setActiveStatus(sec._id)}
              className={`flex w-full items-center justify-between px-5 py-4 text-left transition-all duration-200 ${
                activeStatus === sec._id
                  ? 'bg-richblack-700 text-yellow-50'
                  : 'bg-richblack-800 text-richblack-50 hover:bg-richblack-700'
              }`}
            >
              <div className="flex items-center gap-3">

                {/* Section Number */}
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                    activeStatus === sec._id
                      ? 'bg-yellow-50 text-richblack-900'
                      : 'bg-richblack-600 text-richblack-200'
                  }`}
                >
                  {index + 1}
                </span>

                <span className="text-sm font-semibold">
                  {sec?.sectionName}
                </span>
              </div>

              {/* Arrow */}
              <span
                className={`text-lg transition-transform duration-200 ${
                  activeStatus === sec._id ? 'rotate-90' : ''
                }`}
              >
                ›
              </span>
            </button>

            {/* Sub Sections */}
            {activeStatus === sec._id && (
              <div className="bg-richblack-900">

                {sec.subSection.map((subSec, index) => {
                  const isActive = videoBarActive === subSec?._id
                  const isCompleted = completedLectures.includes(
                    subSec?._id
                  )

                  return (
                    <div
                      key={index}
                      className={`flex cursor-pointer items-start gap-3 border-l-4 px-5 py-4 transition-all duration-200 ${
                        isActive
                          ? 'border-yellow-50 bg-yellow-200 text-richblack-900'
                          : 'border-transparent text-richblack-200 hover:border-richblack-500 hover:bg-richblack-800'
                      }`}
                      onClick={() => {
                        setVideoBarActive(subSec?._id)

                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${sec._id}/sub-section/${subSec?._id}`
                        )
                      }}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => {
                          setVideoBarActive(subSec._id)

                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${sec._id}/sub-section/${subSec?._id}`
                          )
                        }}
                        className="mt-1 h-4 w-4 cursor-pointer accent-yellow-400"
                      />

                      {/* Lecture Number + Title */}
                      <div className="flex flex-1 gap-3">
                        <span
                          className={`text-xs font-medium ${
                            isActive
                              ? 'text-richblack-700'
                              : 'text-richblack-400'
                          }`}
                        >
                          {index + 1}.
                        </span>

                        <span
                          className={`text-sm leading-5 ${
                            isActive
                              ? 'font-semibold'
                              : 'font-medium'
                          }`}
                        >
                          {subSec.title}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoDetailsSidebar

