// useSeeVideosStore.js
import axios from 'axios';
import create from 'zustand';

const useSeeVideosStore = create((set) => ({
  videoData: [],

  fetchVideo: async (formId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/videos/${formId}`);
      const videos = await Promise.all(
        response.data.map(async (video) => {
          // Request presigned URL for each video
          const presignedUrlResponse = await axios.get(`http://localhost:5000/api/presigned-url/${video.videoKey}`);
          return {
            candidateId: video.candidateId,
            uploadDate: video.uploadDate,
            presignedUrl: presignedUrlResponse.data.presignedUrl,
          };
        })
      );
      set({ videoData: videos });
    } catch (error) {
      console.error("Error fetching video URLs:", error);
    }
  },
}));

export default useSeeVideosStore;
