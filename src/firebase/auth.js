// src/firebase/auth.js
import {
  GoogleAuthProvider, // Import Google Auth Provider
  signInWithPopup,    // Import function for pop-up sign-in
  signOut,            // Import function for signing out
  onAuthStateChanged  // Import function to listen for auth state changes
} from 'firebase/auth'; // From the Firebase Authentication SDK

// Import the initialized 'auth' instance from your config file
import { auth } from './config';

// Create a new instance of the Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// --- Google Sign In Function ---
export const signInWithGoogle = async () => {
  try {
    // signInWithPopup opens a Google sign-in pop-up window
    // It returns a user credential object upon successful authentication
    const userCredential = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google successfully:", userCredential.user.displayName);
    return userCredential.user; // Return the authenticated user object
  } catch (error) {
    // Handle specific errors from Google Sign-In
    if (error.code === 'auth/popup-closed-by-user') {
      console.warn("Google sign-in pop-up closed by user.");
      throw new Error("Sign-in cancelled by user."); // Throw a custom error for UI display
    } else {
      // Log other errors and re-throw them for the calling component to handle
      console.error("Error signing in with Google:", error.code, error.message);
      throw error;
    }
  }
};

// --- User Sign Out Function ---
export const signOutUser = async () => {
  try {
    // Call the Firebase SDK signOut function
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error.code, error.message);
    throw error; // Re-throw the error
  }
};

// --- Real-time Authentication State Listener ---
// This function allows other parts of your app (like App.js)
// to know immediately when a user logs in or out.
export const subscribeToAuthChanges = (callback) => {
  // onAuthStateChanged returns an unsubscribe function that can be called to stop listening
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    // The 'user' object is null if no user is logged in, or contains user info if logged in.
    callback(user); // Call the provided callback function with the current user status
  });
  return unsubscribe; // Return the unsubscribe function for cleanup
};