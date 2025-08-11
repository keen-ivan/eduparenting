// src/pages/VideoDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoById } from '../firebase/firestore'; // Import function to fetch single video

function VideoDetailPage() {
  const { levelId, videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedVideo = await getVideoById(videoId);
        if (fetchedVideo && fetchedVideo.levelId === levelId) {
          setVideo(fetchedVideo);
        } else {
          setError("Video not found or does not belong to this level.");
          setVideo(null);
        }
      } catch (err) {
        console.error("Error fetching video details:", err);
        setError("Failed to load video details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (videoId && levelId) {
      fetchVideo();
    }
  }, [videoId, levelId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
        Loading video...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red', fontSize: '1.2em' }}>
        <p>{error}</p>
        <button
          onClick={() => navigate(`/dashboard/${levelId}#videos`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Go Back to Videos
        </button>
      </div>
    );
  }

  if (!video) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666', fontSize: '1.2em' }}>
        <p>Video not found.</p>
        <button
          onClick={() => navigate(`/dashboard/${levelId}#videos`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Go Back to Videos
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#28a745', marginBottom: '20px', fontSize: '2.2em' }}>
        {video.title}
      </h2>
      {video.expertName && (
        <p style={{ color: '#6c757d', fontSize: '1.1em', marginBottom: '10px' }}>
          Expert: {video.expertName}
        </p>
      )}
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '1.1em', lineHeight: '1.6' }}>
        {video.description}
      </p>

      {video.url && (
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px', textAlign: 'center' }}>
          <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5em' }}>Watch Video:</h3>
          {/* Embedding a simple iframe for a YouTube URL example */}
          {video.url.includes("youtube.com") && ( // Basic check for YouTube URL
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={video.url.replace("watch?v=", "embed/")} // Convert standard YouTube URL to embed URL
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>
          )}
          {!video.url.includes("youtube.com") && ( // If not a YouTube URL, just show a link
            <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '1em' }}>
              Open Video Link
            </a>
          )}
          {video.duration && (
            <p style={{ color: '#777', fontSize: '0.9em', marginTop: '20px' }}>
              Duration: {video.duration}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => navigate(`/dashboard/${levelId}#videos`)}
        style={{
          padding: '12px 25px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginTop: '40px',
          display: 'block',
          margin: '40px auto 0 auto'
        }}
      >
        ← Back to All Videos
      </button>
    </div>
  );
}

export default VideoDetailPage;