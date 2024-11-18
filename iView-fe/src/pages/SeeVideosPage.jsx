import React, { useEffect, useState } from 'react';
import useSeeVideosStore from '../store/useSeeVideosStore';
import { useParams } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { GrDocumentVideo } from "react-icons/gr";
import VideoPlayer from '../components/VideoPlayerModal'; 
import CandidateModal from '../components/modals/CandidateReviewModal'; 

const SeeVideosPage = () => {
  const { interviewId } = useParams();
  const {
    fetchCandidates,
    fetchInterviewQuestions,
    candidateData,
    deleteCandidate,
    candidateStatus,
    interviewQuestions,
    getCandidateStatus,
    updateCandidateStatus,
    loading,
    error,
  } = useSeeVideosStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (interviewId) {
      fetchCandidates(interviewId);
      fetchInterviewQuestions(interviewId);
    }
  }, [interviewId, fetchCandidates, fetchInterviewQuestions]);

  const handleDelete = async (candidateId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
    if (confirmDelete) {
      await deleteCandidate(candidateId);
    }
  };

  const openModal = async (candidate) => {
    setSelectedCandidate(candidate);
    await getCandidateStatus(candidate._id);  
    setNewNote(candidate.note || "");
    setNewStatus(candidateStatus || "Pending"); 

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleSave = async () => {
    if (selectedCandidate) {
      const success = await updateCandidateStatus(selectedCandidate._id, newStatus, newNote); 
      if (success) {
        closeModal();  
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Candidate's Videos</h1>

      {candidateData.length === 0 ? (
        <p className="text-lg text-gray-600">No candidate videos found for this interview.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidateData.map((candidate) => (
            <div key={candidate._id} className="wrapper bg-gray-400 antialiased text-gray-900 rounded-lg shadow-lg">
              <div>
                <VideoPlayer videoUrl={candidate.videoUrl} /> {/* VideoPlayer component */}
                <div className="relative px-4 -mt-16">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <span className={`text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide ${candidate.status === "Passed" ? "bg-green-200 text-green-800" : candidate.status === "Failed" ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"}`}>
                      {candidate.status || "Pending"}
                    </span>
                    <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">{candidate.name} {candidate.surname}</h4>
                    <p className="text-sm text-gray-600">Email: {candidate.email}</p>
                    <p className="text-sm text-gray-600">Phone: {candidate.phoneNumber}</p>
                    <div className="mt-4">
                      <button className="text-orange-500 mr-3" onClick={() => handleDelete(candidate._id)}>
                        <FaTrash size={20} />
                      </button>
                      <button className="text-purple-500 ml-4 mt-3" onClick={() => openModal(candidate)}>
                        <GrDocumentVideo size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CandidateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        candidate={selectedCandidate}
        interviewQuestions={interviewQuestions}
        newNote={newNote}
        setNewNote={setNewNote}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        handleSave={handleSave}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default SeeVideosPage;
