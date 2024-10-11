import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayoutPage from './layout/AdminLayout';
import ManageQuestionList from './pages/ManageQuestionPackagePage';
import QuestionListPage from './pages/QuestionListPage'; 
import PackageListPage from './pages/PackageListPage'; 
import InterviewList from './pages/InterviewListPage';
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Admin Login */}
        <Route path="/" element={<AdminLoginPage />} />

        {/* Admin Layout altında diğer sayfalar */}
        <Route path="/admin-page" element={<AdminLayoutPage />}>
          {/* Manage Questions/Packages için alt rotalar */}
       <Route path="manage-questions-package" element={<ManageQuestionList />}>
          
            {/* Alt rotalar ManageQuestionList altında yüklenir 
            */}
            <Route path="question-list" element={<QuestionListPage />} />
            <Route path="package-list" element={<PackageListPage />} />
            
          </Route>
          
          <Route path="interview-list" element={<InterviewList />}>
          
          {/* Alt rotalar ManageQuestionList altında yüklenir 
          <Route path="question-list" element={<QuestionListPage />} />
          <Route path="package-list" element={<PackageListPage />} />
          */}
          
          
        </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
