import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = cardData.heading === currentCard;

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`
        flex flex-col justify-between
        p-6
        w-80 h-70
        cursor-pointer
        transition-all duration-300

        ${isActive
          ? "bg-white text-richblack-900 shadow-[12px_12px_0px_#FFD60A]"
          : "bg-richblack-800 text-white "}
      `}
    >
      {/* Top */}
      <div>
        <h3 className="text-lg font-semibold">
          {cardData.heading}
        </h3>

        <p className="mt-3 text-[17px] text-richblack-400 ">
          {cardData.description}
        </p>
      </div>

      {/* Bottom */}
      <div
              className={`flex justify-between items-center
          pt-3 border-t text-sm
          ${isActive
            ? "border-richblack-200 text-richblue-400"
            : "border-richblack-700 text-richblack-400"}
    `}
            >
              {/* Level */}
              <div className="flex items-center gap-2 text-[16px]">
                <HiUsers />
                <p>{cardData?.level}</p>
              </div>
      
              {/* Flow Chart */}
              <div className="flex items-center gap-2 text-[16px]">
                <ImTree />
                <p>{cardData?.lessionNumber} Lession</p>
              </div>
            </div>
    </div>
  );
};

export default CourseCard;