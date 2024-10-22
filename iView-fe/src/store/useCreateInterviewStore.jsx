
import { create } from 'zustand';
import axios from 'axios';
const useCreateInterviewStore = create((set) => ({
  title: '',
  packageName: '',
  expireDate: '',
  canSkip: false,
  showAtOnce: false,
  setTitle: (title) => set({ title }),
  setPackageName: (packageName) => set({ packageName }),
  setExpireDate: (expireDate) => set({ expireDate }),
  setCanSkip: (canSkip) => set({ canSkip }),
  setShowAtOnce: (showAtOnce) => set({ showAtOnce }),
  // Async function to handle interview creation and axios post
  saveInterview: async (onAddInterview) => {
    const { title, packageName, expireDate } = useCreateInterviewStore.getState(); // Get necessary state
    if (!title || !packageName || !expireDate) {
      alert('Please fill in all required fields');
      return;
    }
    const newInterview = {
      title,
      packageName,
      expireDate,
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
        canSkip: false,
        showAtOnce: false,
      }); // Reset form after successful save
    } catch (error) {
      console.error('Error saving interview:', error);
      alert('Failed to save the interview. Please try again.');
    }
  },
  resetForm: () =>
    set({
      title: '',
      packageName: '',
      expireDate: '',
      canSkip: false,
      showAtOnce: false,
    }),
}));
export default useCreateInterviewStore;