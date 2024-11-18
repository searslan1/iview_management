import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayoutPage from './layout/AdminLayout';
import ManageQuestionList from './pages/ManageQuestionPackagePage';
import QuestionListPage from './pages/QuestionListPage';
import PackageListPage from './pages/PackageListPage';
import InterviewList from './pages/InterviewListPage';
import SeeVideosPage from './pages/SeeVideosPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main admin login route */}
        <Route path="/" element={<AdminLoginPage />} />

        {/* Admin layout with nested routes */}
        <Route path="/admin-page" element={<AdminLayoutPage />}>
          {/* Manage Questions/Packages routes */}
          <Route path="manage-questions-package" element={<ManageQuestionList />}>
            <Route path="question-list" element={<QuestionListPage />} />
            <Route path="package-list" element={<PackageListPage />} />
          </Route>

          {/* Interview list route */}
          <Route path="interview-list" element={<InterviewList />} />

          {/* Nested see-videos route */}
          <Route path="see-videos/:interviewId" element={<SeeVideosPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
