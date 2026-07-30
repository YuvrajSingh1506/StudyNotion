
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../../services/operation/courseDetailAPI'
import { getInstructorData } from '../../../../services/operation/profileAPI'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'

const Instructor = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.profile)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true)

            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            console.log(instructorApiData)

            if (instructorApiData.length) {
                setInstructorData(instructorApiData)
            }

            if (result) {
                setCourses(result)
            }

            setLoading(false)
        }

        getCourseDataWithStats()
    }, [])

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )

    const totalStudent = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    )

    return (
        <div className="w-full">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-richblack-5">
                    Hi {user?.firstName}
                </h1>

                <p className="font-medium text-richblack-200">
                    Let's start something new
                </p>

                {loading ? (
                    <div className="spinner">
                        Loading....
                    </div>
                ) : courses.length > 0 ? (
                    <div className="space-y-6">

                        {/* Chart + Statistics */}
                        <div className="my-4 flex min-h-[450px] w-full gap-4">

                            {/* Chart */}
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                <InstructorChart courses={instructorData} />
                            </div>

                            {/* Statistics */}
                            <div className="w-[250px] shrink-0 rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">
                                    Statistics
                                </p>

                                <div className="mt-4 space-y-6">

                                    <div>
                                        <p className="text-lg text-richblack-200">
                                            Total Courses
                                        </p>
                                        <p className="text-3xl font-semibold text-richblack-50">
                                            {courses.length}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-lg text-richblack-200">
                                            Total Students
                                        </p>
                                        <p className="text-3xl font-semibold text-richblack-50">
                                            {totalStudent}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-lg text-richblack-200">
                                            Total Income
                                        </p>
                                        <p className="text-3xl font-semibold text-richblack-50">
                                            Rs. {totalAmount}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Your Courses */}
                        <div className="rounded-md bg-richblack-800 p-6">

                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-richblack-5">
                                    Your Courses
                                </p>

                                <Link to="/dashboard/my-courses">
                                    <p className="text-xs font-semibold text-yellow-50">
                                        View All
                                    </p>
                                </Link>
                            </div>

                            <div className="my-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {courses.slice(0, 3).map((course) => (
                                    <div
                                        key={course._id}
                                        className="w-full"
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="h-[201px] w-full rounded-md object-cover"
                                        />

                                        <div className="mt-3 w-full">
                                            <p className="text-sm font-medium text-richblack-50">
                                                {course.courseName}
                                            </p>

                                            <div className="mt-1 flex items-center space-x-2">
                                                <p className="text-xs font-medium text-richblack-300">
                                                    {course.studentsEnrolled.length} students
                                                </p>

                                                <p className="text-xs font-medium text-richblack-300">
                                                    |
                                                </p>

                                                <p className="text-xs font-medium text-richblack-300">
                                                    Rs. {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>You have not created any course yet</p>

                        <Link to="/dashboard/addCourse">
                            Create a course
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Instructor;
