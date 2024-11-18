import { create } from 'zustand';
import axios from 'axios';

const ApiUrl = import.meta.env.VITE_API_URL;
const useCandidateStore = create((set) => ({
    candidateId: null,
    surname: '',
    submitCandidateForm: async (uuid, formData) => {
        try {
            const response = await axios.post(`${ApiUrl}/api/candidate/submit`, { uuid, ...formData });
            const { candidateId, surname } = response.data;
            set({ candidateId, surname });
            return { candidateId };
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    }
}));

export default useCandidateStore;