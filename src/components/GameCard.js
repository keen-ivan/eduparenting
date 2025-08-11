// src/components/GameCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CardStyles.css'; // Import the new stylesheet

function GameCard({ game, levelId }) {
  return (
    <Link to={`/dashboard/${levelId}/games/${game.id}`} className="card-link">
      <div className="card-container">
        <h4 className="card-title-game">
          {game.title}
        </h4>
        <p className="card-description">
          {game.description}
        </p>
        {game.materialsNeeded && (
          <p className="card-meta">
            Materials: {game.materialsNeeded}
          </p>
        )}
        {game.ageAppropriate && (
          <p className="card-meta">
            Age: {game.ageAppropriate}
          </p>
        )}
      </div>
    </Link>
  );
}

export default GameCard;