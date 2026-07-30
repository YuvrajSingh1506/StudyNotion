import React from 'react'
import HightlightText from './HighlightText';
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton';
const LearningLanguageSection = () => {
    return (
    <div>
        <div className='flex flex-col gap-5 mt-[130px] items-center mb-32'>
            {/* heading of learning language section */}
            
            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for <HightlightText text={"learning any language"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base mt-4 font-medium w-[73%]'>
                Using spin making learing multiple language easy. with 20+ language realistic voice-over,
                process-tracking, custom schedule and more. 
            </div>
            {/* image  div */}
            <div className='flex items-center justify-center mt-5 mx-auto'>
                <img src={know_your_progress} alt="Know your progress" className='object-contain translate-x-[35%]  z-10'/>
                <img src={compare_with_others} alt="compare with others" className='object-contain z-10 translate-x-[5%]'/>
                <img src={plan_your_lessons} alt="plan your lessons" className='object-contain -translate-x-[30%] z-20'/>
                
            </div>
            <div className='w-fit'>
                <CTAButton active ={true} linkTo={"/signup"}>
                    <div >
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection;
