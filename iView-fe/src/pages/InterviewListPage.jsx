import React from 'react';
import InterviewCard from '../components/modals/InterviewCardModal';  // Assuming this is the file where you store the component

const InterviewList = () => {
  const interviews = [
    { title: 'Backend Interview', team: 'Core UI Team', progress: 76, weeksLeft: 3 },
    { title: 'Frontend Interview', team: 'Core UI Team', progress: 55, weeksLeft: 2 },
    { title: 'DevOps Interview', team: 'Infrastructure Team', progress: 90, weeksLeft: 4 },
    { title: 'Fullstack Interview', team: 'Development Team', progress: 45, weeksLeft: 1 }
  ];

  return (
    <div className="flex flex-wrap">
      {interviews.map((interview, index) => (
        <InterviewCard 
          key={index}
          title={interview.title}
          team={interview.team}
          progress={interview.progress}
          weeksLeft={interview.weeksLeft}
        />
      ))}
    </div>
  );
};

export default InterviewList;
