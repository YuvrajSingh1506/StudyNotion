import React from 'react'
import {Link} from "react-router-dom";
import {FaArrowRight} from 'react-icons/fa';
import HighlightText from '../components/Core/Homepage/HighlightText';
import CTAButton from '../components/Core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/Core/Homepage/CodeBlocks';
import TimelineSection from '../components/Core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/Core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/Core/Homepage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/Core/Homepage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12  max-w-maxContent items-center text-white justify-between '>

            <Link to = {"/signup"}>
            {/* Add shadow and border handle effect to the button */}
                <div className=' group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-2 font-bold text-richblack-200 
          drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none hover:p-1 z-0'>
                    <div className='flex items-center gap-2 rounded-full py-[5px] px-10 
                    transtion-all duration-200 group-hover:bg-richblack-900 z-0'>
                        <p>Become an Instructor </p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With  
                {/* color aqaua to be change */}
                <HighlightText text= {"Coding Skills"}/>    
            </div>
            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                With our online courses, you can learn at your own pace, from anywhere in the world, and get access to a 
                wealth of resource. Including hands-on projects, quizzes, and personalized feedback from instructor.
            </div>
            {/* shadow add to button */}
            <div className='flex gap-7 mt-8'>
                    <CTAButton linkTo = {"/signup"} active={true}>Learn More</CTAButton>

                    <CTAButton linkTo={"/login"} active={false}>Book a Demo</CTAButton>
            </div>

            <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 mt-16">
                <video
                className="shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
                >
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>
            {/* CodeSection1 */}
            <div>
                <CodeBlocks 
                    position={"lg : flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your 
                            <HighlightText text = {"coding courses"}/>
                            &nbsp; with our online courses
                        </div>
                    }
                    subheading ={
                        "Our course are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowlegde with you"
                    }
                    ctabtn1={
                        {
                            btnText : "Try it yourself",
                            linkTo : "/signup",
                            active : true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText : "Learn More",
                            linkTo : "/login",
                            active : false,
                        }
                    }
                    codeblock= {
                        `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                    }
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>
            {/* CodeSection2 */}
            <div>
                <CodeBlocks 
                    position={"lg : flex-row-reverse"}
                    heading={
                        <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                            Start
                        <HighlightText text={"coding in seconds"} />
                        </div>
                    }
                    subheading ={
                      "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            link: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                        }
                    }
                    codeColor={"text-white"}
                    codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>

            {/* Card Section */}

            <ExploreMore/>
        </div> 

        {/* Section2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>

                {/* two button with background image */}
                <div className='homepage_bg h-[400px] '>
                    <div className='w-11/12 h-full max-w-maxContent flex items-center justify-center gap-5 mx-auto'>
                        <div className='flex gap-7 text-white'>
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div className='flex gap-3 items-center'>
                                    Explore Full Catelog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo={"/signup"}>
                                    Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>
                {/* Job that is demand section */}
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                {/* Job that is in Demand - Section 1 */}
                    <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                        Get the skills you need for a{" "}
                        <HighlightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px] text-richblack-600">
                            The modern StudyNotion is the dictates its own terms. Today, to
                            be a competitive specialist requires more than professional
                            skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="">Learn More</div>
                        </CTAButton>
                        </div>
                    </div>
                    
                 {/* section with image and quotes    */}
                    <TimelineSection/>
                    
                {/* image cousre detail */}
                    <LearningLanguageSection/>

                </div>
               
        </div>
        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8
         bg-richblack-900 text-white'>
            {/* become a instructor */}
            <InstructorSection/>
            <h2 className='text-center text-4xl font-semibold mt-10'>Review from Other Learners</h2>
            <ReviewSlider/>
            
        </div>

        {/* Footer */}
        <Footer/>
    </div>
  )
}
export default Home;