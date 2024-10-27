import { create } from 'zustand';
import axios from 'axios';

const useCandidateStore = create((set) => ({
    candidateId: null,

    submitCandidateForm: async (interviewId, formData) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/candidate/submit`, { interviewId, ...formData });
            const { candidateId } = response.data;

            // Store the candidate ID in Zustand and return it
            set({ candidateId });
            return { candidateId };
        } catch (error) {
            console.error('Form submission error:', error);
            throw error; // rethrow to handle in the form component if needed
        }
    }
}));

export default useCandidateStore;
