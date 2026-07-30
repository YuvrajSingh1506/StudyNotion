
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operation/courseDetailAPI"
import { updateCompletedLectures } from "../../../slice/viewCourseSlice"
import { useEffect, useRef, useState } from "react"
import { AiFillPlayCircle } from "react-icons/ai"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const playerRef = useRef()

    const [isPlaying, setIsPlaying] = useState(false)
    const { token } = useSelector((state) => state.auth)

    const {
        courseSectionData,
        courseEntireData,
        completedLectures
    } = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([])
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length) {
                return
            }

            if (!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses")
            } else {
                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )

                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    (data) => data._id === subSectionId
                )

                setVideoData(filteredVideoData[0])
                setVideoEnded(false)
            }
        }

        setVideoSpecificDetails()
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndex =
            courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
                (data) => data._id === subSectionId
            )

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true
        } else {
            return false
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSection =
            courseSectionData?.[currentSectionIndex]?.subSection?.length

        const currentSubSectionIndex =
            courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
                (data) => data._id === subSectionId
            )

        if (
            currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSection - 1
        ) {
            return true
        } else {
            return false
        }
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSection =
            courseSectionData?.[currentSectionIndex]?.subSection?.length

        const currentSubSectionIndex =
            courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
                (data) => data._id === subSectionId
            )

        if (currentSubSectionIndex !== noOfSubSection - 1) {
            const nextSubSectionId =
                courseSectionData?.[currentSectionIndex]?.subSection[
                    currentSubSectionIndex + 1
                ]._id

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            )
        } else {
            const nextSectionId =
                courseSectionData?.[currentSectionIndex + 1]?._id

            const nextSubSectionId =
                courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]?._id

            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            )
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSection =
            courseSectionData?.[currentSectionIndex]?.subSection?.length

        const currentSubSectionIndex =
            courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
                (data) => data._id === subSectionId
            )

        if (currentSubSectionIndex !== 0) {
            const prevSubSectionId =
                courseSectionData?.[currentSectionIndex]?.subSection[
                    currentSubSectionIndex - 1
                ]._id

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )
        } else {
            const prevSectionId =
                courseSectionData?.[currentSectionIndex - 1]?._id

            const prevSubSectionLength =
                courseSectionData?.[currentSectionIndex - 1].subSection?.length

            const prevSubSectionId =
                courseSectionData?.[currentSectionIndex - 1]?.subSection?.[
                    prevSubSectionLength - 1
                ]?._id

            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true)

        const result = await markLectureAsComplete(
            {
                courseId: courseId,
                subSectionId: subSectionId
            },
            token
        )

        if (result) {
            dispatch(updateCompletedLectures(subSectionId))
        }

        setLoading(false)
    }

    return (
        <div className="w-full text-richblack-5">
            {!videoData ? (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="rounded-lg bg-richblack-800 px-8 py-6 text-lg text-richblack-200">
                        No Data Found
                    </div>
                </div>
            ) : (
                <div className="mx-auto w-full max-w-[1100px]">

                    {/* Video Section */}
                    <div className="overflow-hidden rounded-xl border border-richblack-700 bg-richblack-900 shadow-lg">

                        <div className="relative aspect-video w-full bg-black">

                            <video
                                ref={playerRef}
                                src={videoData?.videoURL}
                                controls
                                width="100%"
                                height="100%"
                                className="h-full w-full object-contain"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setVideoEnded(true)}
                            />

                            {/* Play Button Overlay */}
                            {!isPlaying && !videoEnded && (
                                <div
                                    onClick={() => {
                                        if (playerRef.current) {
                                            playerRef.current.play()
                                            setIsPlaying(true)
                                        }
                                    }}
                                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 transition-all hover:bg-black/30"
                                >
                                    <AiFillPlayCircle
                                        size={80}
                                        className="text-white opacity-90 transition-transform duration-200 hover:scale-110"
                                    />
                                </div>
                            )}

                            {/* Video End Controls */}
                            {videoEnded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/75 px-4">

                                    <p className="text-xl font-semibold text-white">
                                        Lecture Completed
                                    </p>

                                    {/* Completion Buttons */}
                                    <div className="flex flex-wrap items-center justify-center gap-3">

                                        {!completedLectures.includes(
                                            subSectionId
                                        ) && (
                                            <IconBtn
                                                disabled={loading}
                                                text={
                                                    !loading
                                                        ? "Mark as Complete"
                                                        : "Loading..."
                                                }
                                                onclick={
                                                    handleLectureCompletion
                                                }
                                            />
                                        )}

                                        <IconBtn
                                            disabled={loading}
                                            onclick={() => {
                                                if (playerRef.current) {
                                                    playerRef.current.currentTime = 0
                                                    playerRef.current.play()
                                                    setVideoEnded(false)
                                                }
                                            }}
                                            text="Rewatch"
                                        />
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex items-center gap-3">

                                        {!isFirstVideo() && (
                                            <button
                                                onClick={goToPrevVideo}
                                                className="rounded-md border border-richblack-500 bg-richblack-700 px-6 py-2 font-semibold text-richblack-5 transition-all hover:border-richblack-300 hover:bg-richblack-600"
                                            >
                                                ← Prev
                                            </button>
                                        )}

                                        {!isLastVideo() && (
                                            <button
                                                onClick={goToNextVideo}
                                                className="rounded-md bg-yellow-50 px-6 py-2 font-semibold text-richblack-900 transition-all hover:bg-yellow-100"
                                            >
                                                Next →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Video Information */}
                    <div className="mt-6 rounded-xl border border-richblack-700 bg-richblack-800 p-5 md:p-6">

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-richblack-5 md:text-3xl">
                            {videoData?.title}
                        </h1>

                        {/* Divider */}
                        <div className="my-4 h-px w-full bg-richblack-700" />

                        {/* Description */}
                        <div>
                            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-richblack-300">
                                About this lecture
                            </h2>

                            <p className="whitespace-pre-line text-sm leading-7 text-richblack-200 md:text-base">
                                {videoData?.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoDetails

