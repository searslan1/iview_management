import axios from 'axios';
import { create } from 'zustand';


const API_URL = process.env.VITE_API_URL;

const useSeeVideosStore = create((set) => ({
  candidateData: [],
  candidateStatus: null,
  selectedCandidateId: null,
  interviewQuestions: [],
  loading: false,
  error: null,

  // Adayları Fetch Et
  fetchCandidates: async (interviewId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/api/candidate/iview/${interviewId}`); // Dinamik API URL kullanımı
      set({ candidateData: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      set({ candidateData: [], loading: false });
    }
  },


  fetchInterviewQuestions: async (interviewId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/api/iview/${interviewId}`);
      
      // Soruları sadece questionText ve duration ile filtreliyoruz
      const questions = response.data.questions.map((question) => ({
        questionText: question.questionText,
        duration: question.duration,
      }));
  
      set({ interviewQuestions: questions, loading: false });
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      set({ interviewQuestions: [], loading: false });
    }
  },

  // Adayı Sil
  deleteCandidate: async (candidateId) => {
    try {
      await axios.delete(`${API_URL}/api/candidate/delete/${candidateId}`);
      // Başarılı bir silme işleminden sonra aday listesini güncelle
      set((state) => ({
        candidateData: state.candidateData.filter(candidate => candidate._id !== candidateId),
      }));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  },

  // Aday Durumunu Fetch Et
  getCandidateStatus: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/candidate/candidates/${id}/status`);
      set({ candidateStatus: response.data.status, selectedCandidateId: id, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching candidate status", loading: false });
    }
  },

  // Aday Durumunu Güncelle
  updateCandidateStatus: async (id, status, note) => {  // Note parametresi eklendi
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/api/candidate/update/${id}/status`, 
        { status, note }  // Backend'e gönderilecek veri
      );
      set((state) => ({
        candidateStatus: response.data.status,
        candidateData: state.candidateData.map((candidate) =>
          candidate._id === id ? { ...candidate, status: status, note: note } : candidate
        ),
        loading: false,
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error updating candidate status", loading: false });
      return false;
    }
  },
}));

export default useSeeVideosStore;
