import React from 'react';
import VideoPlayer from '../VideoPlayerModal'; // Adjust the path if necessary
import NoteEditor from '../NoteEditor'; // Adjust the path if necessary

const CandidateModal = ({
  isOpen,
  onClose,
  candidate,
  interviewQuestions,
  newNote,
  setNewNote,
  newStatus,
  setNewStatus,
  handleSave,
  loading,
  error,
}) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <button onClick={onClose} className="text-gray-500 text-lg font-semibold float-right">&times;</button>
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Candidate: {candidate.name} {candidate.surname}</h2>
          
          <div className="flex space-x-4">
            {/* Left side with video */}
            <div className="w-1/2">
              <VideoPlayer videoUrl={candidate.videoUrl} /> {/* VideoPlayer component */}
            </div>
            
            {/* Vertical border between sections */}
            <div className="w-px bg-gray-300"></div>
            
            {/* Right side with questions and status selection */}
            <div className="w-1/2 ml-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-600">Interview Questions</h3>
              <div className="text-sm text-gray-600 space-y-2">
                {interviewQuestions && interviewQuestions.length > 0 ? (
                  interviewQuestions.map((question, index) => (
                    <div key={index} className="p-2 bg-gray-100 rounded-md shadow-sm">
                      <strong>{question.questionText}</strong>
                      <span className="ml-2 text-xs text-gray-500">({question.duration} mins)</span>
                    </div>
                  ))
                ) : (
                  <p>No questions available</p>
                )}
              </div>
              <NoteEditor note={newNote} onNoteChange={setNewNote} /> {/* NoteEditor component */}
              <div className="mt-4">
                <label htmlFor="status" className="font-semibold">Status</label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Passed">Passed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <button
                onClick={handleSave}
                className="mt-4 w-full bg-teal-500 text-white p-2 rounded-md shadow-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
