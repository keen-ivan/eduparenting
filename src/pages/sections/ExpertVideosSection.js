// src/pages/sections/ExpertVideosSection.js
import React from 'react';
import VideoCard from '../../components/VideoCard';
import './SectionStyles.css';

const ExpertVideosSection = ({ videos, levelId }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="message-container">
        <p className="no-content-message">No expert videos available for the {levelId} stage yet.</p>
        <p className="no-content-message">Check back soon for more valuable insights!</p>
      </div>
    );
  }
  return (
    <div className="section-container">
      <h3 className="section-title">
        Expert Videos for {levelId.charAt(0).toUpperCase() + levelId.slice(1)}
      </h3>
      <div className="cards-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} levelId={levelId} />
        ))}
      </div>
    </div>
  );
};

export default ExpertVideosSection;