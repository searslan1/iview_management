import React, { useState, useEffect } from 'react';
import { FaLink, FaTrash, FaQuestionCircle } from "react-icons/fa";
import QuestionModal from '../modals/InterviewQuestionsModal'; 
import useInterviewStore from '../../store/useInterviewListStore';

const isExpired = (expireDate) => {
  const currentDate = new Date();
  const interviewExpireDate = new Date(expireDate);
  return interviewExpireDate < currentDate;
};

const InterviewCard = ({ id, title, totalCandidates, onHoldCandidates, expireDate, packageName }) => {
  console.log(id);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [accessError, setAccessError] = useState(false);
  const { deleteInterview, loadInterview_Id, interview } = useInterviewStore();
  const publishedStatus = isExpired(expireDate) ? 'Not Live' : 'Live';


  useEffect(() => {
    if (id) {
      loadInterview_Id(id);
    }
  }, [id, loadInterview_Id]);

  const openQuestionModal = () => setIsQuestionModalOpen(true);
  const closeQuestionModal = () => setIsQuestionModalOpen(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      await deleteInterview(id);
      console.log('Interviewid:',id)

    }
  };

  const handleCopyLink = () => {
    if (isExpired(expireDate)) {
      setAccessError(true);
      alert("Interview has expired, link cannot be copied.");
    } else {
      // Check if interview ID is available
      const interviewId = interview?._id || id; // fallback to prop id if interview is not yet loaded
      const interviewLink = `http://localhost:5174/information-form/${interviewId}`;
      navigator.clipboard.writeText(interviewLink)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="relative bg-white py-8 px-6 rounded-3xl w-[30%] my-4 shadow-xl mr-6">
      <div className="absolute right-4 top-4">
        <button className="text-gray-400 mr-4" onClick={openQuestionModal}>
          <FaQuestionCircle size={18} />
        </button>
        <button className="text-gray-400" onClick={handleDelete}>
          <FaTrash size={16} />
        </button>
      </div>
      <div className="text-white flex items-center absolute rounded-full py-2 px-2 shadow-xl bg-[#47A7A2] left-6 -top-4">
        <button onClick={handleCopyLink} className="flex items-center">
          <FaLink />
        </button>
      </div>
      <div className="mt-8">
        <p className="text-xl font-semibold my-2">{title}</p>
        <div className="mt-4">
          <p className="text-gray-600 font-semibold mb-2">Candidates:</p>
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="text-center w-1/2 border-r-2 border-gray-300">
              <p className="text-gray-400 text-sm">TOTAL</p>
              <p className="text-2xl font-bold">{totalCandidates}</p>
            </div>
            <div className="text-center w-1/2">
              <p className="text-gray-400 text-sm">ON HOLD</p>
              <p className="text-2xl font-bold">{onHoldCandidates}</p>
            </div>
          </div>
        </div>
        <div className="border-t-2 my-4"></div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
            <FaLink className="mr-1" />
            <p>{publishedStatus}</p>
          </div>
          <div>
            <a href="#" className="text-[#47A7A2] hover:underline">See Videos &gt;</a>
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onClose={closeQuestionModal}
          packageName={packageName} // Pass the package name to load questions
        />
      )}
    </div>
  );
};

export default InterviewCard;
