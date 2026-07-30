
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStarsRaw from 'react-stars';
const ReactStars = ReactStarsRaw.default || ReactStarsRaw;
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operation/courseDetailAPI';
import { RiChatSettingsLine } from 'react-icons/ri';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);

    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm()

    useEffect(()=>{
        register("courseRating",{required:true})
        setValue("courseExperience","");
        setValue("courseRating",0);
        console.log("ReactStar",typeof ReactStars)
    },[]);

    const onSubmit = async (data) =>{
        await createRating({
            courseId:courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience,
        },token);

        setReviewModal(false);
    }

    const ratingChanged = (newRating) =>{
        setValue("courseRating",newRating);
    }

    return (
        <div className="fixed inset-0 z-[1000] flex min-h-screen items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">

            {/* Modal */}
            <div className="w-full max-w-[550px] overflow-hidden rounded-xl border border-richblack-600 bg-richblack-800 shadow-2xl">

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-richblack-600 bg-richblack-700 px-6 py-5">

                    <h2 className="text-xl font-semibold text-richblack-5">
                        Add Review
                    </h2>

                    {/* add close icon in place of close here */}
                    <button
                        onClick={()=>setReviewModal(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-richblack-200 transition-all duration-200 hover:bg-richblack-600 hover:text-richblack-5"
                    >
                        Close
                    </button>

                </div>

                {/* Modal Body */}
                <div className="px-6 py-6">

                    {/* User Information */}
                    <div className="flex items-center gap-4">

                        <img
                            src={user?.image}
                            alt="User Image"
                            className="aspect-square w-[50px] rounded-full border-2 border-richblack-500 object-cover"
                        />

                        <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold text-richblack-5">
                                {user?.firstName} {user?.lastName}
                            </p>

                            <p className="text-sm text-richblack-300">
                                Posting Publicly
                            </p>
                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col items-center gap-6"
                    >

                        {/* Rating */}
                        <div className="flex w-full flex-col items-center gap-2 rounded-lg bg-richblack-700 px-4 py-5">
                            <p className="text-sm font-medium text-richblack-200">
                                How would you rate this course?
                            </p>

                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>

                        {/* Experience */}
                        <div className="w-full">
                            <label
                                htmlFor="courseExperience"
                                className="mb-2 block text-sm font-medium text-richblack-5"
                            >
                                Add your Experience
                                <sup className="ml-1 text-pink-200">*</sup>
                            </label>

                            <textarea
                                id="courseExperience"
                                placeholder="Add your experience here"
                                {...register("courseExperience",{required:true})}
                                className="form-style min-h-[130px] w-full resize-none rounded-lg border border-richblack-600 bg-richblack-700 p-4 text-sm text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50"
                            ></textarea>

                            {
                                errors.courseExperience &&(
                                    <span className="mt-1 block text-xs text-pink-200">
                                        Course Experience is required
                                    </span>
                                )
                            }
                        </div>

                        {/* Buttons */}
                        <div className="flex w-full justify-end gap-3 border-t border-richblack-600 pt-5">

                            <button
                                onClick={()=>setReviewModal(false)}
                                className="rounded-lg bg-richblack-600 px-5 py-3 text-sm font-semibold text-richblack-5 transition-all duration-200 hover:bg-richblack-500"
                            >
                                Cancel
                            </button>

                           
                            <button
                                type="submit"
                                className="rounded-lg bg-yellow-50 px-5 py-3 text-sm font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-100"
                            >
                                Save
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal;

