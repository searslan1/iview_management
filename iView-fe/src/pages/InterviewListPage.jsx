import React, { useEffect, useState } from 'react';
import InterviewCard from '../components/modals/InterviewCardModal';
import CreateInterviewModal from '../components/modals/CreateInterviewModal';
import Button from '../components/Button';
import { FaUsersViewfinder } from "react-icons/fa6";
import usePackageStore from '../store/usePackageListStore';
import useInterviewStore from '../store/useInterviewListStore';

const InterviewList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Package store
  const { packages, loadPackageNames } = usePackageStore();

  // Interview store
  const { interviews, loadInterviews, addInterview } = useInterviewStore();

  // Manage interview form state
  const [title, setTitle] = useState('');
  const [packageName, setPackageName] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await loadPackageNames();
      await loadInterviews();
      setLoading(false); // Set loading to false after fetching
    };
    fetchData();
  }, [loadPackageNames, loadInterviews]);

  const handleAddInterview = async () => {
    if (!title || !packageName || !expireDate) {
      alert('Please fill in all required fields');
      return;
    }
    const newInterview = { title, packageName, expireDate, canSkip, showAtOnce };
    await addInterview(newInterview);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setTitle('');
    setPackageName('');
    setExpireDate('');
    setCanSkip(false);
    setShowAtOnce(false);
  };

  if (loading) {
    return <div>Loading interviews...</div>; // Loading state
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
            key={interview._id} // Use unique ID instead of index
            id={interview._id}
            title={interview.title}
            totalCandidates={interview.totalCandidates}
            onHoldCandidates={interview.onHoldCandidates}
            expireDate={interview.expireDate}
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
          title={title}
          packageName={packageName}
          expireDate={expireDate}
          canSkip={canSkip}
          showAtOnce={showAtOnce}
          setTitle={setTitle}
          setPackageName={setPackageName}
          setExpireDate={setExpireDate}
          setCanSkip={setCanSkip}
          setShowAtOnce={setShowAtOnce}
          packages={packages}
        />
      )}
    </div>
  );
};

export default InterviewList;
