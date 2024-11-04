import { create } from 'zustand';
import axios from 'axios';

const useVideoUploadStore = create((set) => ({
  isUploading: false,
  error: null,
  successMessage: null,

  uploadVideo: async (file, formId) => {
    set({ isUploading: true, error: null, successMessage: null });

    try {
      const formData = new FormData();
      formData.append('video', file); // 'video' olarak güncellendi
      formData.append('formId', formId);

      const response = await axios.post(
        'http://localhost:5000/api/videos/upload-video',
        formData
      );
      

      // Assuming response contains a success message without a video URL
      set({ successMessage: response.data.message });
      console.log('Video uploaded successfully:', response.data.message);
      return response.data.message;

    } catch (error) {
      set({ error: error.message });
      console.error('Video upload error:', error);
      throw error;
    } finally {
      set({ isUploading: false });
    }
  },
}));


export default useVideoUploadStore;
