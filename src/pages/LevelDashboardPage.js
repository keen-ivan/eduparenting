// src/pages/LevelDashboardPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLessons, getExpertVideos, getGameSuggestions } from '../firebase/firestore';
import LessonsSection from './sections/LessonsSection';
import ExpertVideosSection from './sections/ExpertVideosSection';
import GameSuggestionsSection from './sections/GameSuggestionsSection';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './LevelDashboardPage.css';

function LevelDashboardPage() {
  const { levelId } = useParams();
  const [activeTab, setActiveTab] = useState('lessons');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const levelInfo = {
    'toddlers': { name: 'Toddlers', age: '0-3 Years' },
    'early-childhood': { name: 'Early Childhood', age: '3-6 Years' },
    'middle-childhood': { name: 'Middle Childhood', age: '7-11 Years' },
    'adolescence': { name: 'Adolescence', age: '12-18 Years' },
    'emerging-adulthood': { name: 'Emerging Adulthood', age: '18+ Years' },
  };

  const currentLevel = levelInfo[levelId] || { name: 'Unknown', age: '' };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedData = [];
        if (activeTab === 'lessons') {
          fetchedData = await getLessons(levelId);
        } else if (activeTab === 'expertVideos') {
          fetchedData = await getExpertVideos(levelId);
        } else if (activeTab === 'gameSuggestions') {
          fetchedData = await getGameSuggestions(levelId);
        }
        setData(fetchedData);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [levelId, activeTab]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard for: {currentLevel.name}</h1>
        <p className="dashboard-subtitle">{currentLevel.age}</p>
      </div>
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons
        </button>
        <button
          className={`tab-button ${activeTab === 'expertVideos' ? 'active' : ''}`}
          onClick={() => setActiveTab('expertVideos')}
        >
          Expert Videos
        </button>
        <button
          className={`tab-button ${activeTab === 'gameSuggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('gameSuggestions')}
        >
          Game Suggestions
        </button>
      </div>
      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}
      {!loading && !error && (
        <>
          <h2 className="content-section-title">{
            activeTab === 'lessons' ? `Lessons for ${currentLevel.name}` :
            activeTab === 'expertVideos' ? `Expert Videos for ${currentLevel.name}` :
            `Game Suggestions for ${currentLevel.name}`
          }</h2>
          {activeTab === 'lessons' && <LessonsSection lessons={data} levelId={levelId} />}
          {activeTab === 'expertVideos' && <ExpertVideosSection videos={data} levelId={levelId} />}
          {activeTab === 'gameSuggestions' && <GameSuggestionsSection games={data} levelId={levelId} />}
        </>
      )}
    </div>
  );
}

export default LevelDashboardPage;