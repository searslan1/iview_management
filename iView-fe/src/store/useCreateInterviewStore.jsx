import { create } from 'zustand';
import axios from 'axios';
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
      // Axios request to save interview
      const response = await axios.post('http://localhost:5000/api/iview/create', newInterview);
      console.log('Interview saved successfully:', response.data);
      onAddInterview(newInterview); // Call the callback function with the new interview
      set({
        title: '',
        packageName: '',
        expireDate: '',
        status: 'Live',
      }); // Reset form after successful save
      return true;
    } catch (error) {
      console.error('Error creating or fetching interview:', error);
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