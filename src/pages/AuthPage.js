// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase/auth';
import GoogleSignInButton from '../components/GoogleSignInButton';
import authBackground from '../assets/images/auth-background.jpg';

function AuthPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Google sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      {/* Background Image Container */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${authBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1, // This places the background behind the content
        }}
      ></div>

      {/* Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1, // This places the content on top of the background
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: A semi-transparent white background for readability
          borderRadius: '10px',
        }}
      >
        <h2 style={{ marginBottom: '30px', fontSize: '2em', color: '#333' }}>Welcome to Eduparenting!</h2>
        <p style={{ marginBottom: '25px', fontSize: '1.1em', color: '#555' }}>
          Sign in to unlock personalized content for your child's growth journey.
        </p>

        {/* Google Sign-In Button */}
        <GoogleSignInButton onClick={handleGoogleSignIn} disabled={loading} />

        {/* Display loading message or error */}
        {loading && <p style={{ marginTop: '15px', color: '#007bff' }}>Signing in...</p>}
        {error && <p style={{ marginTop: '15px', color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default AuthPage;