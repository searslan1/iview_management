// src/stores/useVideoUploadStore.js
import { create } from 'zustand';
import axios from 'axios';

const useVideoUploadStore = create((set) => ({
  isUploading: false,
  videoUrl: null,
  error: null,

  uploadVideo: async (file, formId) => {
    set({ isUploading: true, error: null });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('formId', formId);

      const response = await axios.post('http://localhost:5000/api/videos/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      set({ videoUrl: response.data.videoUrl });
      console.log('Video uploaded successfully:', response.data.videoUrl);
      return response.data.videoUrl;
      
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
