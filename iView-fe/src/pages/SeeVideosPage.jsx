// SeeVideosPage.js
import React, { useEffect } from 'react';
import useSeeVideosStore from '../store/useSeeVideosStore';
import { useParams } from 'react-router-dom';

const SeeVideosPage = () => {
  const { interviewId } = useParams();
  const { fetchVideo, videoData } = useSeeVideosStore();

  useEffect(() => {
    if (interviewId) fetchVideo(interviewId);
  }, [interviewId, fetchVideo]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Candidate Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoData?.map((video, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4">
            <video controls src={video.presignedUrl} className="w-full rounded-lg mb-4"></video>
            <p className="text-lg font-semibold">Candidate ID: {video.candidateId}</p>
            <p className="text-sm text-gray-600">Uploaded on: {video.uploadDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeVideosPage;
