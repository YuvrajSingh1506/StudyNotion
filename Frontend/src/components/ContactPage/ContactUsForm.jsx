
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/api"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)

      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )

      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className="w-full rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:p-8 lg:p-10">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
          Get in Touch
        </h2>

        <p className="mt-2 text-sm leading-6 text-richblack-300 sm:text-base">
          Have a question or need help? Send us a message and we’ll get back
          to you as soon as possible.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitContactForm)}
        className="flex flex-col gap-6"
      >

        {/* First + Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-richblack-5"
            >
              First Name <sup className="text-yellow-100">*</sup>
            </label>

            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              {...register("firstname", { required: true })}
            />

            {errors.firstname && (
              <span className="text-xs text-yellow-100">
                Please enter your name.
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-richblack-5"
            >
              Last Name
            </label>

            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              {...register("lastname")}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-richblack-5"
          >
            Email Address <sup className="text-yellow-100">*</sup>
          </label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <span className="text-xs text-yellow-100">
              Please enter your Email address.
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phonenumber"
            className="text-sm font-medium text-richblack-5"
          >
            Phone Number <sup className="text-yellow-100">*</sup>
          </label>

          <div className="flex gap-3">

            {/* Country Code */}
            <div className="w-[105px] shrink-0">
              <select
                name="countrycode"
                id="countrycode"
                className="h-full w-full cursor-pointer rounded-lg border border-richblack-600 bg-richblack-700 px-2 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((ele, i) => {
                  return (
                    <option
                      key={i}
                      value={ele.code}
                      className="bg-richblack-800"
                    >
                      {ele.code} - {ele.country}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Phone */}
            <div className="flex-1">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                  maxLength: {
                    value: 12,
                    message: "Invalid Phone Number",
                  },
                  minLength: {
                    value: 10,
                    message: "Invalid Phone Number",
                  },
                })}
              />
            </div>
          </div>

          {errors.phoneNo && (
            <span className="text-xs text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-richblack-5"
          >
            Message <sup className="text-yellow-100">*</sup>
          </label>

          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here..."
            className="min-h-[160px] w-full resize-y rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm leading-6 text-richblack-5 outline-none transition-all duration-200 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            {...register("message", { required: true })}
          />

          {errors.message && (
            <span className="text-xs text-yellow-100">
              Please enter your Message.
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className={`mt-2 w-full rounded-lg bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 sm:w-fit sm:min-w-[150px] ${
            !loading
              ? "hover:scale-[0.98] hover:shadow-none"
              : "cursor-not-allowed bg-richblack-500"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}

export default ContactUsForm
