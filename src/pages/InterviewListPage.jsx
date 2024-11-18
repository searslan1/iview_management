import React, { useEffect, useState } from 'react';
import InterviewCard from '../components/modals/InterviewCardModal';
import CreateInterviewModal from '../components/modals/CreateInterviewModal';
import Button from '../components/Button';
import { FaUsersViewfinder } from "react-icons/fa6";
import usePackageStore from '../store/usePackageListStore';
import useInterviewStore from '../store/useInterviewListStore';
import useCreateInterviewStore from '../store/useCreateInterviewStore';

const InterviewList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Package store
  const { packages, loadPackageNames } = usePackageStore();
  
  // Interview store
  const { interviews, loadInterviews, addInterview, loadCandidateStats } = useInterviewStore();
  
  // Interview form state from useCreateInterviewStore
  const { resetForm } = useCreateInterviewStore();

  // Local state for candidate stats
  const [candidateStats, setCandidateStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await loadPackageNames();
      await loadInterviews();
      
      // Load candidate stats for each interview
      const statsPromises = interviews.map(async (interview) => {
        const stats = await loadCandidateStats(interview._id);
        return { [interview._id]: stats };
      });
      
     
      const statsResults = await Promise.all(statsPromises);
      const stats = Object.assign({}, ...statsResults);
      setCandidateStats(stats);
      setLoading(false);
    };
    fetchData();
  }, [loadPackageNames, loadInterviews, loadCandidateStats, interviews]);

  const handleAddInterview = async () => {
    
    await addInterview({}); 
    resetForm();
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading interviews...</div>;
  }

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-between items-center w-full mb-5">
        <h1 className="text-2xl font-bold">Interview List</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-[#47A7A2] hover:text-red-700 text-l px-4 py-2 rounded-full"
          label={<FaUsersViewfinder size={40} />}
        />
      </div>
      <div className="flex flex-wrap">
        {interviews.map((interview) => (
          <InterviewCard
            key={interview._id}
            id={interview._id}
            title={interview.title}
            totalCandidates={candidateStats[interview._id]?.totalCandidates || 0}
            onHoldCandidates={candidateStats[interview._id]?.pendingCandidates || 0}
            status={interview.status}
            packageName={interview.packageName}
            questions={interview.questions}
          />
        ))}
      </div>
      {isModalOpen && (
        <CreateInterviewModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm(); // Reset form on close
          }}
          onAddInterview={handleAddInterview}
          packages={packages}
        />
      )}
    </div>
  );
};

export default InterviewList;
