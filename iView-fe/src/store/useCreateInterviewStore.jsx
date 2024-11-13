import { create } from 'zustand';
import axios from 'axios';

const useCreateInterviewStore = create((set) => ({
  title: '',
  packageName: '',
  expireDate: '',

  setTitle: (title) => set({ title }),
  setPackageName: (packageName) => set({ packageName }),
  setExpireDate: (expireDate) => set({ expireDate }),

  // Async function to handle interview creation and axios post
  saveInterview: async (onAddInterview) => {
    const { title, packageName, expireDate } = useCreateInterviewStore.getState();
    
    if (!title || !packageName || !expireDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newInterview = { title, packageName, expireDate };

    try {
      // Axios request to save interview
      const response = await axios.post('http://localhost:5000/api/iview/create', newInterview);
      console.log('Interview saved successfully:', response.data);

      onAddInterview(newInterview); // Call the callback function with the new interview
      
      set({ title: '', packageName: '', expireDate: '' }); // Reset form after successful save

      // Retrieve the UUID link for the created interview
      const { link: interviewId } = response.data;
      await fetchInterview(interviewId);
    } catch (error) {
      console.error('Error creating or fetching interview:', error);
    }
  },

  resetForm: () => set({ title: '', packageName: '', expireDate: '' }),
}));

export default useCreateInterviewStore;
