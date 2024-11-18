import { create } from 'zustand';
import axios from 'axios';

// API URL'sini çevre değişkeninden alıyoruz
const apiUrl = process.env.VITE_API_URL;

const useInterviewStore = create((set) => ({
    interview: null,
    interviews: [],
    isLoading: false,
    error: null,
    candidateStats: null, // Add candidateStats to the store state

    // Fetch all interviews from the server
    loadInterviews: async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/iview/interviews`);
            set({ interviews: response.data });
        } catch (error) {
            console.error('Error loading interviews:', error);
        }
    },

    // Add a new interview to the state and database
    addInterview: async (interviewData) => {
        try {
            const response = await axios.post(`${apiUrl}/api/iview/create`, interviewData);
            set((state) => ({
                interviews: [...state.interviews, response.data],
            }));
        } catch (error) {
            console.error('Error adding interview:', error);
        }
    },

    // Fetch a single interview by ID
    loadInterview_Id: async (interviewId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${apiUrl}/api/iview/link/${interviewId}`);
            set({ interview: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            console.error('Error loading interview:', error);
            set({ isLoading: false, error: error.response?.data?.error || 'Unknown error' });
            return null;
        }
    },

    // Delete an interview by ID
    deleteInterview: async (interviewId) => {
        try {
            await axios.delete(`${apiUrl}/api/iview/delete/${interviewId}`);
            set((state) => ({
                interviews: state.interviews.filter((interview) => interview._id !== interviewId),
            }));
        } catch (error) {
            console.error('Error deleting interview:', error);
        }
    },

    // New function to load candidate stats by interview ID
    loadCandidateStats: async (interviewId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${apiUrl}/api/candidate/interview/${interviewId}/stats`);
            set({ candidateStats: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            console.error('Error loading candidate stats:', error);
            set({ isLoading: false, error: error.response?.data?.error || 'Unknown error' });
            return null;
        }
    },

}));

export default useInterviewStore;
