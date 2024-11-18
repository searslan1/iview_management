import { create } from 'zustand';
import axios from 'axios';
const ApiUrl = import.meta.env.VITE_API_URL;



const useInterviewFetchStore = create((set, get) => ({
  interview: null,
  isLoading: false,
  error: null,
  // Interview'i yüklemek için id kullanıyoruz
  loadInterview_Id: async (uuid) => {
    set({ isLoading: true, error: null });
    console.log("Backend'e gönderilen id:", uuid);
    try {
      const response = await axios.get(`${ApiUrl}/api/iview/app/${uuid}`); // id gönderiliyor
      set({ interview: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.error || 'Unknown error' });
    }
  },
  // Soruları alma fonksiyonu
  getQuestions: () => get().interview?.questions || [],
}));

export default useInterviewFetchStore;
