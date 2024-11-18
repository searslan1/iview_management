import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import QuestionList from '../pages/QuestionListPage';
import PackageList from '../pages/PackageListPage';

const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState('questions');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    // Navigate to the corresponding route
    navigate(`${tab === 'questions' ? 'question-list' : 'package-list'}`);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Tabs for Managing Questions and Managing Packages */}
      <div className="flex justify-center mb-4">
        <Button
          label="Manage Questions"
          onClick={() => handleTabChange('questions')}
          className={`px-6 py-2 ${selectedTab === 'questions' ? ' bg-[#47A7A2] text-white' : 'bg-white text-[#47A7A2]'}`}
        />
       
        <Button
          label="Manage Packages"
          onClick={() => handleTabChange('packages')}
          className={`px-6 py-2 ml-4 ${selectedTab === 'packages' ? 'bg-[#47A7A2] text-white' : 'bg-white text-[#47A7A2]'}`}
        />
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {selectedTab === 'questions' && <QuestionList />}
      {selectedTab === 'packages' && <PackageList />}
      
    </div>
  );
};

export default MainPage;
