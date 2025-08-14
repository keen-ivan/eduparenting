// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase/auth';
import GoogleSignInButton from '../components/GoogleSignInButton';
import authBackground from '../assets/images/auth-background.jpg'; // <-- IMPORT THE IMAGE

function AuthPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    // ... (rest of your Google Sign-In logic) ...
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Use 100vh to ensure it fills the entire viewport
        padding: '20px',
        textAlign: 'center',
        
        // --- ADD THESE STYLES FOR THE BACKGROUND IMAGE ---
        backgroundImage: `url(${authBackground})`, 
        backgroundSize: 'cover',        // Ensures the image covers the whole div
        backgroundPosition: 'center',   // Centers the image
        backgroundRepeat: 'no-repeat',  // Prevents the image from repeating
        // --------------------------------------------------
      }}
    >
      <h2 style={{ marginBottom: '30px', fontSize: '2em', color: 'gray' }}>Welcome to Eduparenting!</h2>
      <p style={{ marginBottom: '25px', fontSize: '1.1em', color: 'black' }}>
        Sign in to unlock personalized content for your child's growth journey.
      </p>

      {/* Google Sign-In Button */}
      <GoogleSignInButton onClick={handleGoogleSignIn} disabled={loading} />

      {/* Display loading message or error */}
      {loading && <p style={{ marginTop: '15px', color: '#007bff' }}>Signing in...</p>}
      {error && <p style={{ marginTop: '15px', color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AuthPage;