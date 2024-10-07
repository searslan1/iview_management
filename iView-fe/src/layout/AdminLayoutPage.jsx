import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

const MainSidebar = () => {
  return (
    <div className="bg-white w-64 h-screen p-4 border-r">
     <div className="text-3xl font-bold mb-10" style={{ color: '#47A7A2' }}>
  I-VIEW
</div>
      <ul>
        <li className="mb-4">
        <a href="/launch-list" className="text-gray-700 font-semibold hover:text-[#47A7A2]">
  Manage Question Package
</a>
        </li>
        <li>
          <a href="/launch-list" className="text-gray-700 font-semibold hover:text-[#47A7A2]">Interview List</a>
        </li>
      </ul>
    </div>
  );
};

const AppHeader = () => {
  return (
    <div
  className="border-b p-3 mt-2 shadow rounded-lg"
  style={{ backgroundColor: '#47A7A2', marginLeft: '10px', marginRight: '10px' }} // Sağ ve sol boşluk
>
  <h1 className="text-xl font-bold text-center" style={{ color: '#EEFAF9' }}>
    I-View Admin Panel
  </h1>
</div>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <MainSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Header Component */}
        <AppHeader />

        <div className="flex-1 p-6 overflow-auto">
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

export default AdminLayout;
