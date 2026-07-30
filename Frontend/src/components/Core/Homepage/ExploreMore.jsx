import { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";
import HightlightText from "./HighlightText";
import CourseCard from "./CourseCard";
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];
const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    const setMyCard = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        // console.log(result);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
   return (
    <div>
         <div className="flex flex-col mt-35.5 relative">
                {/* heading power of code */}
                <div className="text-4xl font-semibold text-center">
                    Unlock the 
                    <HightlightText text={"Power of Code"}/>
                </div>
                <div className="text-[16px]  text-center text-richblack-300 mt-3">
                    Learn to Build Anything You Can Imagine
                </div>
                {/* tab domian options */}
                <div className = "flex rounded-full bg-richblack-800 p-1 mt-10 mb-12">
                    {
                        tabsName.map((tab,index)=>{
                                return(
                                    <span className = {`px-4 rounded-full py-2
                                         ${currentTab ===tab  ?  "bg-richblack-900 text-richblack-50 font-medium":"text-richblack-300"} 
                                         text-[16px] transition-all duration-200 cursor-pointer`} 
                                     key={index} onClick={()=>setMyCard(tab)}>{tab}</span>
                                )
                        })
                    }
                </div>
                {/*tab field*/}
                <div className="h-[150px]"></div>
                

                {/* Cards Container */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[60%] flex gap-8">
    
                        {courses.map((card, index) => (
                        <CourseCard
                            key={index}
                            cardData={card}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                        ))}

                     </div>

                
         </div>
    </div>
  )
}

export default ExploreMore