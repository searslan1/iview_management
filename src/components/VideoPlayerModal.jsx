// VideoPlayer.js
import React from 'react';

const VideoPlayer = React.memo(({ videoUrl }) => {
  return (
    <div className="w-full">
      <video controls src={videoUrl} className="w-full rounded-lg shadow-lg" style={{ height: '200px' }} />
    </div>
  );
});

export default VideoPlayer;
