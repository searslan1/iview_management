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
    loadInterview_Id: async (interviewId) => 
        { set({ isLoading: true });
     try { const response = await axios.get(`http://localhost:5000/api/iview/link/${interviewId}`); 
     set({ interview: response.data, questions: response.data.questions, isLoading: false }); 
    } catch (error) { console.error('Error loading interview:', error); set({ isLoading: false }); } },
    // Delete an interview by ID
    deleteInterview: async (interviewId) => {
        try {
          await axios.delete(`http://localhost:5000/api/iview/delete/${interviewId}`);
          set((state) => ({
            interviews: state.interviews.filter((interview) => interview._id !== interviewId),
          }));
        } catch (error) {
          console.error('Error deleting interview:', error);
        }
      },
      
}));

export default useInterviewStore;