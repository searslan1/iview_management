import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const QuestionModal = ({ isOpen, onClose, questions }) => {
  const [localQuestions, setLocalQuestions] = useState([]);

  useEffect(() => {
    
    setLocalQuestions(questions);
  }, [questions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <div className='bg-[#47A7A2] w-full p-3 border rounded-xl flex justify-between'>
            <h2 className="text-xl text-white font-semibold">Question List</h2>
            <button onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>
        <ul className="max-h-64 overflow-y-auto">
          {localQuestions && localQuestions.length > 0 ? (
            localQuestions.map((question, index) => (
              <li
                key={question._id || index} 
                className="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="font-semibold">{question.questionText}</span>
                <span className="text-sm text-gray-600">{question.duration} min</span>
              </li>
            ))
          ) : (
            <p>No questions available for this interview.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuestionModal;
