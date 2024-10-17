import React from 'react';
import { FaLink, FaTrash, FaQuestionCircle } from "react-icons/fa";


const isExpired = (expireDate) => {
  const currentDate = new Date();
  const interviewExpireDate = new Date(expireDate);
  return interviewExpireDate < currentDate;
};

const InterviewCard = ({ title, totalCandidates, onHoldCandidates, expireDate }) => {
  // Determine the published status
  const publishedStatus = isExpired(expireDate) ? 'Not Live' : 'Live';

  return (
    <div className="relative bg-white py-8 px-6 rounded-3xl w-[30%] my-4 shadow-xl mr-6">
      
      {/* Top-right Question Mark Icon Button */}
      <div className="absolute right-4 top-4">
        <button className="text-gray-400 mr-4">
          <FaQuestionCircle size={18} />
        </button>
        <button className="text-gray-400">
          <FaTrash size={16} />
        </button>
      </div>

      {/* Link Icon on Top Left */}
      <div className="text-white flex items-center absolute rounded-full py-2 px-2 shadow-xl bg-[#47A7A2] left-6 -top-4">
        <FaLink />
      </div>

      <div className="mt-8">
        {/* Title */}
        <p className="text-xl font-semibold my-2">{title}</p>

        {/* Candidates Section */}
        <div className="mt-4">
          <p className="text-gray-600 font-semibold mb-2">Candidates:</p>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-inner">
            {/* Total Column */}
            <div className="text-center w-1/2 border-r-2 border-gray-300">
              <p className="text-gray-400 text-sm">TOTAL</p>
              <p className="text-2xl font-bold">{totalCandidates}</p>
            </div>

            {/* On Hold Column */}
            <div className="text-center w-1/2">
              <p className="text-gray-400 text-sm">ON HOLD</p>
              <p className="text-2xl font-bold">{onHoldCandidates}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 my-4"></div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          {/* Published Status */}
          <div className="flex items-center">
            <FaLink className="mr-1" />
            <p>{publishedStatus}</p> {/* Show "Expired" or "Published" */}
          </div>

          {/* See Videos Link */}
          <div>
            <a href="#" className="text-[#47A7A2] hover:underline">
              See Videos &gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
