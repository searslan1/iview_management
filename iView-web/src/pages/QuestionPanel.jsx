import React, { useState, useEffect } from 'react';
import useInterviewStore from '../stores/useInterviewFetchStore';
import Button from '../components/Button'; // Assuming you have a custom Button component

const Interview = ({ interviewId }) => {
  const { interview, questions, loadInterview_Id, isLoading } = useInterviewStore(); // Fetching data from Zustand store
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(960); // Total interview time: 16 minutes

  // Load interview and questions when component mounts
  useEffect(() => {
    loadInterview_Id(interviewId);
  }, [interviewId, loadInterview_Id]);

  // Update question time when a new question is displayed
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionTime(questions[currentQuestionIndex]?.duration || 0);
    }
  }, [currentQuestionIndex, questions]);

  // Timer for question duration
  useEffect(() => {
    const questionInterval = setInterval(() => {
      setQuestionTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(questionInterval);
  }, [questionTime]);

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTime(questions[currentQuestionIndex + 1]?.duration || 0);
    }
  };

  if (isLoading) {
    return <p>Loading interview...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Top Logo */}
      <div className="mb-6">
        <img src="/path-to-logo" alt="Logo" className="w-32 h-32" />
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg">
        {/* Left Side - Question Display */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Recording Time: {16 - Math.floor(totalTime / 60)}:{totalTime % 60} minutes
          </h3>
          <p className="text-lg text-gray-600">
            {Array.isArray(questions) && questions.length > 0
              ? questions[currentQuestionIndex].text
              : 'Loading question...'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>

        {/* Right Side - Controls */}
        <div className="w-1/3 p-6 bg-gray-50 flex flex-col justify-between">
          {/* Question Timer */}
          <div className="text-center mb-4">
            <p className="text-lg text-gray-800 font-semibold mb-2">
              Question: {Math.floor(questionTime / 60)}:{questionTime % 60}
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              Total: {Math.floor(totalTime / 60)}:{totalTime % 60}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-between">
            <Button
              label="Start"
              onClick={() => console.log('Start recording')}
              className="text-white bg-green-500 font-semibold hover:bg-green-600 border p-2 rounded"
            />
            <Button
              label="Stop"
              onClick={() => console.log('Stop recording')}
              className="text-white bg-red-500 font-semibold hover:bg-red-600 border p-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
