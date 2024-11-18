import { create } from 'zustand';
import axios from 'axios';


const apiUrl = process.env.VITE_API_URL;

const useCreateInterviewStore = create((set) => ({
  title: '',
  packageName: '',
  expireDate: '',
  status: 'Live',
  setTitle: (title) => set({ title }),
  setPackageName: (packageName) => set({ packageName }),
  setExpireDate: (expireDate) => set({ expireDate }),
  setStatus: (status) => set({ status }),
  
  // Async function to handle interview creation and axios post
  saveInterview: async (onAddInterview) => {
    const { title, packageName, expireDate, status } = useCreateInterviewStore.getState(); // Get necessary state

    // Validation for required fields
    if (!title || !packageName || !expireDate) {
      alert('Please fill in all required fields');
      return false;
    }

    const newInterview = {
      title,
      packageName,
      expireDate,
      status,
    };

    try {
      // Axios request to save interview, using dynamic apiUrl
      const response = await axios.post(`${apiUrl}/api/iview/create`, newInterview);
      console.log('Interview saved successfully:', response.data);

      // Call the callback function with the new interview
      if (onAddInterview) {
        onAddInterview(newInterview);
      }

      // Reset form after successful save
      set({
        title: '',
        packageName: '',
        expireDate: '',
        status: 'Live',
      });

      return true;
    } catch (error) {
      console.error('Error creating or fetching interview:', error);
      alert('An error occurred while saving the interview. Please try again later.');
      return false;
    }
  },
  
  resetForm: () =>
    set({
      title: '',
      packageName: '',
      expireDate: '',
      status: 'Live',
    }),
}));

export default useCreateInterviewStore;
