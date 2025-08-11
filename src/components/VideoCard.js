// src/components/VideoCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CardStyles.css'; // Import the new stylesheet

function VideoCard({ video, levelId }) {
  return (
    <Link to={`/dashboard/${levelId}/videos/${video.id}`} className="card-link">
      <div className="card-container">
        <h4 className="card-title-video">
          {video.title}
        </h4>
        {video.expertName && (
          <p className="card-meta">
            Expert: {video.expertName}
          </p>
        )}
        {video.duration && (
          <p className="card-meta">
            Duration: {video.duration}
          </p>
        )}
        <p className="card-meta" style={{ fontSize: '0.8em', fontWeight: 'bold' }}>View Details</p>
      </div>
    </Link>
  );
}

export default VideoCard;