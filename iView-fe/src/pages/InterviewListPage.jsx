import React, { useState } from 'react';
import InterviewCard from '../components/modals/InterviewCardModal';
import CreateInterviewModal from '../components/modals/CreateInterviewModal';
import QuestionModal from '../components/modals/InterviewQuestionsModal'; 
//import useCreateInterviewStore from '../store/useCreateInterviewStore';
import Button from '../components/Button';
import { CiCirclePlus } from "react-icons/ci";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleAddInterview = (newInterview) => {
    setInterviews([...interviews, newInterview]);
    setIsModalOpen(false);
  };

  const openQuestionModal = (packageName) => {
    setSelectedPackage(packageName);
    setIsQuestionModalOpen(true);
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-between items-center w-full mb-5">
        <h1 className="text-2xl font-bold">Interview List</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-[#47A7A2] hover:text-red-700 text-l px-4 py-2 rounded-full"
          label={<CiCirclePlus size={40} />}
        />
      </div>

      <div className="flex flex-wrap">
        {interviews.map((interview, index) => (
          <InterviewCard
            key={index}
            title={interview.title}
            totalCandidates={interview.totalCandidates}
            onHoldCandidates={interview.onHoldCandidates}
            expireDate={interview.expireDate}
            onQuestionClick={() => openQuestionModal(interview.packageName)} // Trigger modal
          />
        ))}
      </div>

      {/* Create Interview Modal */}
      {isModalOpen && (
        <CreateInterviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddInterview={handleAddInterview}
        />
      )}

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onClose={() => setIsQuestionModalOpen(false)}
          packageName={selectedPackage}
        />
      )}
    </div>
  );
};

export default InterviewList;
