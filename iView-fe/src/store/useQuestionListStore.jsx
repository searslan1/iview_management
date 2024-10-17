import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const useQuestionListStore = create((set, get) => ({
  questions: [],
  // Soruları API'den yükleme fonksiyonu
  loadQuestions: async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/`);
      set({ questions: response.data });
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  },
  // Soru ekleme fonksiyonu
  addQuestion: async (newQuestionInput) => {
    try {
      const newQuestion = {
        questionText: newQuestionInput.question,
        duration: parseInt(newQuestionInput.time, 10),
        tags: newQuestionInput.packageNames, // tags olarak packageName kullanıyoruz
      };
      const response = await axios.post(
        `http://localhost:5000/api/questions/create`,
        newQuestion
      );
      // Yeni eklenen soruyu state'e ekleyelim
      set((state) => ({
        questions: [...state.questions, response.data],
      }));
    } catch (error) {
      console.error("Error adding question:", error);
    }
  },
  // Soru düzenleme fonksiyonu
  editQuestion: async (updatedQuestion) => {
    try {
      await axios.put(
        `http://localhost:5000/api/questions/update/${updatedQuestion._id}`,
        updatedQuestion
      );
      set((state) => ({
        questions: state.questions.map((q) =>
          q._id === updatedQuestion._id ? { ...q, ...updatedQuestion } : q
        ),
      }));
    } catch (error) {
      console.error("Error editing question:", error);
    }
  },
  // Soru silme fonksiyonu
  deleteQuestion: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/delete/${id}`);
      set((state) => ({
        questions: state.questions.filter((q) => q._id !== id),
      }));
      console.log(`Question with id ${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  },
  // Tetikleyici işlevi
  triggerReload: () => {
    set({ reloadFlag: !get().reloadFlag });
  },
}));
export default useQuestionListStore;