import { create } from 'zustand';
import axios from 'axios';

const useCandidateStore = create((set) => ({
    candidateId: null,
    surname: '',
    submitCandidateForm: async (uuid, formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/candidate/submit', { uuid, ...formData });
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