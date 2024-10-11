import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const MainSidebar = () => {
  return (
    <div className="bg-white w-1/4 sm:w-64 h-screen p-4 border-r">
      <div className="text-3xl font-bold mb-10" style={{ color: '#47A7A2' }}>
        I-VIEW
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/admin-page/manage-questions-package" className="text-gray-700 font-semibold hover:text-[#47A7A2]">
            Manage Question Package
          </Link>
        </li>
        <li>
          <Link to="/admin-page/interview-list" className="text-gray-700 font-semibold hover:text-[#47A7A2]">
            Interview List
          </Link>
        </li>
      </ul>
    </div>
  );
};

const AppHeader = () => {
  return (
    <div
      className="border-b p-3 mt-2 shadow rounded-lg"
      style={{ backgroundColor: '#47A7A2', marginLeft: '10px', marginRight: '10px' }}
    >
      <h1 className="text-xl font-bold text-center" style={{ color: '#EEFAF9' }}>
        I-View Admin Panel
      </h1>
    </div>
  );
};

const AdminLayoutPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <MainSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header Component */}
        <AppHeader />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet /> 
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-3 text-sm text-gray-500">
          Copyright © 2024 Innovation & Partners. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutPage;
