import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import useInterviewStore from '../../store/useInterviewListStore'; // Now using Interview Store

const QuestionModal = ({ isOpen, onClose, packageName }) => {
  const { loadInterviews, interviews } = useInterviewStore(); // Using interviews and load function

  // Load interviews when modal is opened
  useEffect(() => {
    if (isOpen && packageName) {
      loadInterviews(); // Load the interviews once modal opens
    }
  }, [isOpen, packageName, loadInterviews]);

  if (!isOpen) return null;

  // Find questions related to the packageName (this should be filtered in backend response)
  const questions = interviews.filter(interview => interview.packageName === packageName)[0]?.questions || [];

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
          {questions.length ? (
            questions.map((question) => (
              <li
                key={question._id}
                className="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="font-semibold">{question.questionText}</span>
                <span className="text-sm text-gray-600"></span>
              </li>
            ))
          ) : (
            <p>No questions available for this package.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuestionModal;
