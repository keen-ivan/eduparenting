// src/pages/GameDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameById } from '../firebase/firestore'; // Import function to fetch single game

function GameDetailPage() {
  const { levelId, gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedGame = await getGameById(gameId);
        if (fetchedGame && fetchedGame.levelId === levelId) {
          setGame(fetchedGame);
        } else {
          setError("Game not found or does not belong to this level.");
          setGame(null);
        }
      } catch (err) {
        console.error("Error fetching game details:", err);
        setError("Failed to load game details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (gameId && levelId) {
      fetchGame();
    }
  }, [gameId, levelId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
        Loading game...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red', fontSize: '1.2em' }}>
        <p>{error}</p>
        <button
          onClick={() => navigate(`/dashboard/${levelId}#games`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Go Back to Games
        </button>
      </div>
    );
  }

  if (!game) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666', fontSize: '1.2em' }}>
        <p>Game not found.</p>
        <button
          onClick={() => navigate(`/dashboard/${levelId}#games`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Go Back to Games
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '30px auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#ffc107', marginBottom: '20px', fontSize: '2.2em' }}>
        {game.title}
      </h2>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '1.1em', lineHeight: '1.6' }}>
        {game.description}
      </p>
      <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
        <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.5em' }}>Instructions:</h3>
        <p style={{ whiteSpace: 'pre-wrap', color: '#444', fontSize: '1em', lineHeight: '1.8' }}>
          {game.instructions} {/* Display the full instructions */}
        </p>
        {game.materialsNeeded && (
          <p style={{ color: '#777', fontSize: '0.9em', marginTop: '20px' }}>
            Materials Needed: {game.materialsNeeded}
          </p>
        )}
        {game.ageAppropriate && (
          <p style={{ color: '#777', fontSize: '0.9em' }}>
            Age Appropriate: {game.ageAppropriate}
          </p>
        )}
      </div>

      <button
        onClick={() => navigate(`/dashboard/${levelId}#games`)}
        style={{
          padding: '12px 25px',
          backgroundColor: '#ffc107',
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
        ← Back to All Games
      </button>
    </div>
  );
}

export default GameDetailPage;