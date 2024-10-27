import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
    interview: null,
    questions: [], // Initialize as an empty array to prevent undefined

    // Fetch all interviews from the server
    loadInterview_Id: async (interviewId) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`http://localhost:5000/api/iview/link/${interviewId}`);
            console.log(response.data);
            console.log("Loading interview with ID:", interviewId);
            set({ interview: response.data, questions: response.data.questions || [], isLoading: false });
        } catch (error) {
            console.error('Error loading interview:', error);
            set({ isLoading: false });
        }
    },
}));

export default useInterviewStore;
