import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLine from "../../../assets/Images/TimelineImage.png"
const timeline = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];
const TimelineSection = () => {
  return (
    <div>
        <div className='flex gap-15 items-center'>
            {/* left info part */}
            <div className='flex flex-col  gap-5 w-[45%]'>
              {
                  timeline.map( (element, index) => {
                    
                    return (
                        <div className='flex flex-col ' key={index}>
                            {/* Add shadow and vertical dotted lines*/}
                           <div className='flex gap-6'>
                             <div className='w-[50px] h-[50px] flex items-center bg-white rounded-full align-center'>
                                <img src ={element.Logo} className='mx-auto '/>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='font-bold text-[18px]'>{element.Heading}</h2>
                                <p className='text-base text-richblack-600'>{element.Description}</p>
                            </div>
                           </div>
                            <div className={`mt-2 -mb-1 border-dashed h-6 border-richblack-25 translate-x-[5%] ${index === 3?"border-l-0":"border-l-1"}`}>

                            </div>
                        </div>
                    )
                })
              }
            </div>
            {/* right image */}
            <div className='relative shadow-blue-200'>
                {/* add a ovel shap behind the image which shown little on both side */}
               <div className='relative'>
                 <img src={timeLine }
                    alt="timeline Image"
                    className='shadow-white relative object-cover h-fit z-20'/>
                    <div className='absolute 
                    w-200 h-130      
                    bg-linear-to-r from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb]
                    opacity-20 blur-3xl 
                    rounded-[50%] 
                    -translate-y-[90%] -translate-x-[5%] z-10  '></div>
               </div>
                {/* green element aboue the image */}
                <div className='absolute z-30 bg-caribbeangreen-700 flex text-white uppercase py-7
                    left-[50%] -translate-x-[50%] -translate-y-[50%]
                '>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7' >
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>type of courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection