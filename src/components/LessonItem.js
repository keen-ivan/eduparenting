// src/components/LessonItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CardStyles.css'; // Import the new stylesheet

function LessonItem({ lesson, levelId }) {
  return (
    <Link to={`/dashboard/${levelId}/lessons/${lesson.id}`} className="card-link">
      <div className="card-container">
        <h4 className="card-title-lesson">
          {lesson.title}
        </h4>
        <p className="card-description">
          {lesson.description}
        </p>
        {lesson.duration && (
          <p className="card-meta">
            Duration: {lesson.duration}
          </p>
        )}
      </div>
    </Link>
  );
}

export default LessonItem;