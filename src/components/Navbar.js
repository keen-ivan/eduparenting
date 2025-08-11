// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOutUser } from '../firebase/auth';

// This component receives the 'user' object as a prop from App.js
function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path for conditional rendering

  // --- Handle User Sign Out ---
  const handleLogout = async () => {
    try {
      await signOutUser();
      alert('You have been logged out.');
      navigate('/auth'); // Redirect to auth page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert('Failed to log out. Please try again.');
    }
  };

  // Helper function to determine if a link is active for styling
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e7e7e7',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
        {/* Always link to home/auth based on user status */}
        <Link to={user ? "/home" : "/auth"} style={{ textDecoration: 'none', color: '#333' }}>Eduparenting</Link>
      </div>
      <div>
        {user ? ( // If user is logged in
          <>
            <Link
              to="/home"
              style={{
                margin: '0 15px',
                textDecoration: 'none',
                color: isActive('/home') ? '#007bff' : '#555',
                fontWeight: isActive('/home') ? 'bold' : 'normal',
                borderBottom: isActive('/home') ? '2px solid #007bff' : 'none',
                paddingBottom: '5px'
              }}
            >
              Home
            </Link>

            {/* Dashboard link for when on a dashboard route */}
            {location.pathname.startsWith('/dashboard') && (
              <Link
                to={location.pathname} // Link back to the current dashboard level
                style={{
                  margin: '0 15px',
                  textDecoration: 'none',
                  color: location.pathname.startsWith('/dashboard') ? '#007bff' : '#555',
                  fontWeight: location.pathname.startsWith('/dashboard') ? 'bold' : 'normal',
                  borderBottom: location.pathname.startsWith('/dashboard') ? '2px solid #007bff' : 'none',
                  paddingBottom: '5px'
                }}
              >
                Dashboard
              </Link>
            )}

            <span style={{ margin: '0 15px', color: '#555' }}>Hello, {user.displayName || user.email.split('@')[0]}!</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9em'
              }}
            >
              Logout
            </button>
          </>
        ) : ( // If user is NOT logged in
          // ONLY show "Sign In" link if not already on the /auth page
          location.pathname !== '/auth' && (
            <Link
              to="/auth"
              style={{
                margin: '0 15px',
                textDecoration: 'none',
                color: isActive('/auth') ? '#007bff' : '#555',
                fontWeight: isActive('/auth') ? 'bold' : 'normal',
                borderBottom: isActive('/auth') ? '2px solid #007bff' : 'none',
                paddingBottom: '5px'
              }}
            >
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;