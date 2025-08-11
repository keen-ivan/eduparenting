// src/pages/sections/LessonsSection.js
import React from 'react';
import LessonItem from '../../components/LessonItem';
import './SectionStyles.css';

const LessonsSection = ({ lessons, levelId }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <div className="message-container">
        <p className="no-content-message">No lessons available for the {levelId} stage yet.</p>
        <p className="no-content-message">Stay tuned for more content!</p>
      </div>
    );
  }
  return (
    <div className="section-container">
      <h3 className="section-title">
        Lessons for {levelId.charAt(0).toUpperCase() + levelId.slice(1)}
      </h3>
      {lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} levelId={levelId} />
      ))}
    </div>
  );
};

export default LessonsSection;