import { create } from "zustand";
import axios from "axios";
const usePackageStore = create((set) => ({
  packages: [], // Paket isimlerini tutan state
  questions: [], // Seçilen pakete ait soruları tutan state
  // Tüm paket isimlerini (tag'leri) backend'den çekme
  loadPackageNames: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/questions/tags"
      ); // Backend'den tag'leri çek
      set({ packages: response.data });
    } catch (error) {
      console.error("Error loading packages:", error);
    }
  },
  // Seçilen pakete (tag'e) göre soruları çekme
  loadQuestionsByPackage: async (packageName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/questions/tag/${packageName}`
      ); // Tag'e göre soruları çek
      set({ questions: response.data });
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  },
  // Sorudan belirli bir tag'i silme
  deleteTagFromQuestion: async (questionId, tagName) => {
    try {
      // Soru verisini backend'den al
      const response = await axios.get(
        `http://localhost:5000/api/questions/${questionId}`
      );
      const { questionText, duration, tags } = response.data;

      // Silinecek tag'i çıkart
      const updatedTags = tags.filter((tag) => tag !== tagName);

      // Eğer tag'ler tamamen silindiyse soruyu tamamen kaldırmak için:
      if (updatedTags.length === 0) {
        // Soru tamamen silinmeli
        await axios.delete(`http://localhost:5000/api/questions/delete/${questionId}`);
        set((state) => ({
          questions: state.questions.filter((question) => question._id !== questionId),
        }));
      } else {
        // Backend'e güncellenmiş soruyu gönder
        await axios.put(
          `http://localhost:5000/api/questions/update/${questionId}`,
          {
            questionText,
            duration,
            tags: updatedTags, // only update if not empty
          }
        );

        // Local state'de ilgili soruyu güncelle
        set((state) => ({
          questions: state.questions.map((question) =>
            question._id === questionId
              ? { ...question, tags: updatedTags }
              : question
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting tag from question:", error);
    }
  },

  // Soru sıralama fonksiyonu
  reorderQuestions: async (reorderedQuestions) => {
    try {
      await axios.post(`http://localhost:5000/api/questions/reorder`, {
        reorderedQuestions, // Yeni sıralamayı backend'e gönder
      });
    } catch (error) {
      console.error("Error reordering questions:", error);
    }
  },
}));
export default usePackageStore;