import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
  interviews: [],
  
  // Fetch all interviews from the server
  loadInterviews: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/iview/interviews');
      set({ interviews: response.data });
    } catch (error) {
      console.error('Error loading interviews:', error);
    }
  },
  
  // Add a new interview to the state and database
  addInterview: async (interviewData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/iview/create', interviewData);
      set((state) => ({
        interviews: [...state.interviews, response.data],
      }));
    } catch (error) {
      console.error('Error adding interview:', error);
    }
  },
}));

export default useInterviewStore;
