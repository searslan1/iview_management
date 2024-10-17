import React from 'react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InterviewCard from '../components/modals/InterviewCardModal';
import CreateInterviewModal from '../components/modals/CreateInterviewModal'; // Import the modal
import Button from '../components/Button';
import { CiCirclePlus } from "react-icons/ci";

const InterviewList = () => {
  const navigate = useNavigate(); // Initialize navigation

  // State to manage interview list
  const [interviews, setInterviews] = useState([
    { title: 'Backend Interview', totalCandidates: 6, onHoldCandidates: 3, expireDate: '2023-12-01' },
    { title: 'Frontend Interview', totalCandidates: 8, onHoldCandidates: 2, expireDate: '2023-11-15' },
  ]);

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle adding a new interview
  const handleAddInterview = (newInterview) => {
    setInterviews((prevInterviews) => [...prevInterviews, newInterview]);
    setIsModalOpen(false); // Close modal after adding
  };

  // Function to navigate to Video View Page
  

  return (
    <div className="relative flex flex-col">
      {/* Header with title and add button */}
      <div className="flex justify-between items-center w-full mb-5">
        <h1 className="text-2xl font-bold">Interview List</h1>

        {/* Plus button */}
        <Button 
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="text-[#47A7A2] hover:text-red-700 text-l px-4 py-2 rounded-full"
          label={<CiCirclePlus size={40} />}
        />

        {/* Video button */}
       
      </div>

      {/* Interview cards list */}
      <div className="flex flex-wrap">
        {interviews.map((interview, index) => (
          <InterviewCard
            key={index}
            title={interview.title} 
            totalCandidates={interview.totalCandidates}
            onHoldCandidates={interview.onHoldCandidates}
            expireDate={interview.expireDate} // Pass expireDate here
          />
        ))}
      </div>

      {/* Create Interview Modal */}
      {isModalOpen && (
        <CreateInterviewModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} // Close modal
          onAddInterview={handleAddInterview} // Add new interview
        />
      )}
    </div>
  );
};

export default InterviewList;
