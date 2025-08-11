// src/pages/LessonDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get ID, useNavigate for back button
import { getLessonById } from '../firebase/firestore'; // Import the function to fetch a single lesson

function LessonDetailPage() {
  const { levelId, lessonId } = useParams(); // Get levelId and lessonId from URL parameters
  const navigate = useNavigate();           // Hook for navigation
  const [lesson, setLesson] = useState(null); // State to hold lesson data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedLesson = await getLessonById(lessonId);
        if (fetchedLesson && fetchedLesson.levelId === levelId) { // Basic check if lesson belongs to correct level
          setLesson(fetchedLesson);
        } else {
          setError("Lesson not found or does not belong to this level.");
          setLesson(null);
        }
      } catch (err) {
        console.error("Error fetching lesson details:", err);
        setError("Failed to load lesson details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && levelId) { // Only fetch if both IDs are available
      fetchLesson();
    }
  }, [lessonId, levelId]); // Re-run effect if lessonId or levelId changes

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
        Loading lesson...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red', fontSize: '1.2em' }}>
        <p>{error}</p>
        <button
          onClick={() => navigate(`/dashboard/${levelId}#lessons`)} // Go back to lessons section of dashboard
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Go Back to Lessons
        </button>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666', fontSize: '1.2em' }}>
        <p>Lesson not found.</p>
        <button
          onClick={() => navigate(`/dashboard/${levelId}#lessons`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Go Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#007bff', marginBottom: '20px', fontSize: '2.2em' }}>
        {lesson.title}
      </h2>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '1.1em', lineHeight: '1.6' }}>
        {lesson.description}
      </p>
      <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
        <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5em' }}>Full Content:</h3>
        <p style={{ whiteSpace: 'pre-wrap', color: '#444', fontSize: '1em', lineHeight: '1.8' }}>
          {lesson.content} {/* Display the full content field */}
        </p>
        {lesson.duration && (
          <p style={{ color: '#777', fontSize: '0.9em', marginTop: '20px' }}>
            Estimated Duration: {lesson.duration}
          </p>
        )}
      </div>

      <button
        onClick={() => navigate(`/dashboard/${levelId}#lessons`)} // Navigates back to the lessons section of the specific dashboard
        style={{
          padding: '12px 25px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginTop: '40px',
          display: 'block', // Make it a block to take full width or align center easily
          margin: '40px auto 0 auto' // Center the button
        }}
      >
        ← Back to All Lessons
      </button>
    </div>
  );
}

export default LessonDetailPage;