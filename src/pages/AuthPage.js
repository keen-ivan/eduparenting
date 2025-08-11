// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { signInWithGoogle } from '../firebase/auth'; // Import your Google Sign-In function
import GoogleSignInButton from '../components/GoogleSignInButton'; // Import the new button component

function AuthPage() {
  const [error, setError] = useState('');     // State for displaying authentication errors
  const [loading, setLoading] = useState(false); // State for showing a loading spinner
  const navigate = useNavigate();             // Hook to navigate programmatically

  // --- Handle Google Sign In ---
  const handleGoogleSignIn = async () => {
    setError('');       // Clear any previous errors
    setLoading(true);   // Show loading spinner

    try {
      // Call the signInWithGoogle function from your firebase/auth.js
      const user = await signInWithGoogle();
      console.log('User successfully signed in with Google:', user.displayName);
      // alert('Sign in successful! Redirecting to home page.'); // Optional alert

      // Optional: If you want to save additional user profile data to Firestore
      // You can call a function from firestore.js here, e.g., setUserProfile(user.uid, { name: user.displayName, email: user.email });

      navigate('/home'); // Navigate to the Home page after successful sign in
    } catch (err) {
      // Handle different errors from signInWithGoogle
      if (err.message === "Sign-in cancelled by user.") {
        setError("Google sign-in was cancelled.");
      } else {
        setError('Failed to sign in with Google. Please try again.');
        console.error("Google sign-in error:", err.message);
      }
    } finally {
      setLoading(false); // Hide loading spinner regardless of success/failure
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh', // Take most of the viewport height
      padding: '20px',
      textAlign: 'center'
    }}>
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
  );
}

export default AuthPage;