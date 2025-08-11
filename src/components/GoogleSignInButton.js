// src/components/GoogleSignInButton.js
import React from 'react';

// This component expects an 'onClick' prop which is a function to call when the button is pressed.
// It also expects an optional 'disabled' prop to disable the button during loading states.
function GoogleSignInButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        backgroundColor: '#4285F4', // Google Blue
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: 'bold',
        gap: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}
    >
      <img
        src="https://img.icons8.com/color/16/000000/google-logo.png" // Small Google logo icon
        alt="Google logo"
        style={{ width: '20px', height: '20px' }}
      />
      Sign in with Google
    </button>
  );
}

export default GoogleSignInButton;