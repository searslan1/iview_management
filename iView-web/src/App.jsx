import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import PersonalInformationForm from "./pages/PersonalInformationForm";
import InterviewPage from "./pages/InterviewPage"; 
import Modal from 'react-modal';
import SuccessPage from "./pages/SuccessPage";  // SuccessPage Bileşenini İmport Ediyoruz

Modal.setAppElement('#root');

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Rotalar */}
        <Routes>
          <Route path="/information-form/:uuid" element={<PersonalInformationForm />} />
          <Route path="/interview/:uuid/:formId" element={<InterviewPage />} />
          <Route path="/success" element={<SuccessPage />} /> {/* Yeni rota */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
