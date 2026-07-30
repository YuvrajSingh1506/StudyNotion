import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
const InstructorSection = () => {
  return (
    <div>
        <div className="flex gap-20 items-center mt-16">
            <div className="w-[50%]">
                <img src={Instructor} alt=""
                className="shadow-white shadow-[20px_20px_rgba(255,255,255)]"
                />
            </div>
            <div className="w-[50%] flex flex-col gap-10">
                <div className = "text-4xl font-semibold w-[50%]">
                    Become an <HighlightText text={"Instructor"}/>    
                </div>                           
                <div className="text-richblack-300 font-medium w-[80%] text-[16px]">
                    Instructors from around the world teaches million of students on StudyNotion.
                     We provide the tools and skills to teach whatever you love. 
                </div>
                <div className="w-fit">
                    <CTAButton active={true} linkTo={"/signup"} >
                        <div className="flex gap-4 items-center">
                            <p>Start Teaching today</p>
                            <FaArrowRight/>
                        </div>
                     </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}
export default InstructorSection;