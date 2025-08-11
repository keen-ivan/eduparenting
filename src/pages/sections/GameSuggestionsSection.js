// src/pages/sections/GameSuggestionsSection.js
import React from 'react';
import GameCard from '../../components/GameCard';
import './SectionStyles.css';

const GameSuggestionsSection = ({ games, levelId }) => {
  if (!games || games.length === 0) {
    return (
      <div className="message-container">
        <p className="no-content-message">No game suggestions available for the {levelId} stage yet.</p>
        <p className="no-content-message">New activities are added regularly!</p>
      </div>
    );
  }
  return (
    <div className="section-container">
      <h3 className="section-title">
        Game Suggestions for {levelId.charAt(0).toUpperCase() + levelId.slice(1)}
      </h3>
      <div className="cards-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} levelId={levelId} />
        ))}
      </div>
    </div>
  );
};

export default GameSuggestionsSection;