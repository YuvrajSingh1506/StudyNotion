import React from 'react';
import { Link } from 'react-router-dom';
const HightlightText = ({text}) => {
    // add gradient color to the text and make it bold bg-gradint-to-b from-[] ro-[]
  return(
      <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>
         {" "}{text}
      </span>
  )
}
export default HightlightText;