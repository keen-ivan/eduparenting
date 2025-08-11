// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your page components
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LevelDashboardPage from './pages/LevelDashboardPage';
// Import new detail page components:
import LessonDetailPage from './pages/LessonDetailPage';
import VideoDetailPage from './pages/VideoDetailPage';
import GameDetailPage from './pages/GameDetailPage';

// Import your Navbar component
import Navbar from './components/Navbar';

// Import the authentication state listener
import { subscribeToAuthChanges } from './firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      // (Remove the setTimeout if you added it for demonstration)
      // setTimeout(() => {
        setUser(currentUser);
        setLoading(false);
      // }, 1000);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5em' }}>
        Loading application...
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes: Only accessible if 'user' is not null (logged in) */}
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/auth" replace />}
        />

        {/* Nested Protected Routes for Dashboard and its details */}
        <Route path="/dashboard/:levelId/*" element={user ? <LevelDashboardPage user={user} /> : <Navigate to="/auth" replace />}>
          {/* Note: LevelDashboardPage itself will handle the default section display based on hash */}
        </Route>

        {/* Specific Detail Pages (also protected) */}
        {/* These routes will display full content for a selected item */}
        <Route
          path="/dashboard/:levelId/lessons/:lessonId"
          element={user ? <LessonDetailPage /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/dashboard/:levelId/videos/:videoId"
          element={user ? <VideoDetailPage /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/dashboard/:levelId/games/:gameId"
          element={user ? <GameDetailPage /> : <Navigate to="/auth" replace />}
        />

        {/* Default/Root Route: */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/auth" replace />}
        />

      </Routes>
    </Router>
  );
}

export default App;