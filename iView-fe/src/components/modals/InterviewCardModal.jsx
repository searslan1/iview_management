import React, { useState, useEffect } from 'react';
import { FaLink, FaTrash, FaQuestionCircle } from "react-icons/fa";
import QuestionModal from '../modals/InterviewQuestionsModal';
import useInterviewStore from '../../store/useInterviewListStore';
import { Link } from 'react-router-dom';



const API_URL = import.meta.env.VITE_WEB_URL;

const InterviewCard = ({ id, title, totalCandidates, onHoldCandidates, status, questions }) => {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [localInterview, setLocalInterview] = useState(null);
  const { loadInterview_Id, deleteInterview } = useInterviewStore();

  useEffect(() => {
    if (id) {
      loadInterview_Id(id).then((data) => {
        if (data) {
          setLocalInterview(data);
        } else {
          alert("UUID could not be retrieved. Please try again.");
        }
      });
    }
  }, [id, loadInterview_Id]);

  const openQuestionModal = () => {
    if (!questions || questions.length === 0) {
      alert("Questions are still loading. Please wait.");
      return;
    }
    setIsQuestionModalOpen(true);
  };

  const closeQuestionModal = () => setIsQuestionModalOpen(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      await deleteInterview(id);
    }
  };

  const handleCopyLink = async () => {
    if (status === 'Not Live') {
      alert("Interview is not live; link cannot be copied.");
      return;
    }
    if (localInterview && localInterview.uuid) {
      // Linki çevresel değişken ile oluşturuyoruz
      const interviewLink = `${API_URL}/information-form/${localInterview.uuid}`;
      try {
        await navigator.clipboard.writeText(interviewLink);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy: ", error);
      }
    } else {
      alert("UUID could not be retrieved. Please try again.");
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
            <p>{status}</p> {/* Status doğrudan burada kullanılıyor */}
          </div>
          <Link to={`/admin-page/see-videos/${id}`} className="text-[#47A7A2] hover:underline">
            See Videos &gt;
          </Link>
        </div>
      </div>
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          onClose={closeQuestionModal}
          questions={questions}
        />
      )}
    </div>
  );
};

export default InterviewCard;
