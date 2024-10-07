import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';

import AdminLayoutPage from './layout/AdminLayoutPage'; 

// Import the pages you are routing to
//import ManageQuestionsPage from './pages/ManageQuestionsPage';  // Make sure these paths are correct
//import InterviewListPage from './pages/InterviewListPage';
//import DesignLaunchPage from './pages/DesignLaunchPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Admin Login */}
        <Route path="/" element={<AdminLoginPage />} />
            
            {/* Diğer route'lar bu yorumun içine alındı
            <Route path="manage-questions" element={<ManageQuestionsPage />} />
            <Route path="interview-list" element={<InterviewListPage />} />
            <Route path="design" element={<DesignLaunchPage />} /> */}
            

        {/* Route for Admin Layout after login */}
        <Route path="/admin-page" element={<AdminLayoutPage />} />

        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;