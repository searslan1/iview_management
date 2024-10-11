import React from 'react';
import { FaLink } from "react-icons/fa6";

const InterviewCard = ({ title, team, progress, weeksLeft }) => {
  return (
    <div className="relative bg-white py-8 px-8 rounded-3xl w-[30%] my-4 shadow-xl mr-6">
      <div className="text-white flex items-center absolute rounded-full py-2 px-2 shadow-xl bg-[#47A7A2] left-6 -top-4">
        <span > <FaLink /> </span> {/* You can replace this with an actual icon */}
      </div>
      
      <div className="mt-8">
        <p className="text-xl font-semibold my-2">{title}</p>
        
        <div className="flex space-x-2 text-gray-400 text-sm">
          <p>{team}</p>
        </div>
        
        <div className="flex space-x-2 text-gray-400 text-sm my-3">
          <p>{weeksLeft} Weeks Left</p>
        </div>
        
        <div className="border-t-2"></div>

        <div className="flex justify-between">
          <div className="my-2">
            <p className="font-semibold text-base mb-2">Team Member</p>
            <div className="flex space-x-2">
              {/* Here you can place profile images or other content */}
            </div>
          </div>
          
          <div className="my-2">
            <p className="font-semibold text-base mb-2">Progress</p>
            <div className="text-base text-gray-400 font-semibold">
              <p>{progress}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
