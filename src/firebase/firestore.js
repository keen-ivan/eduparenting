// src/firebase/firestore.js
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db } from './config';

// ... (Your setUserProfile, getUserProfile functions) ...

// --- Data Fetching Functions for Dashboard Sections ---

/**
 * Fetches lessons for a specific child growth level.
 * @param {string} levelId - The ID of the child growth level (e.g., 'toddlers').
 * @returns {Array} An array of lesson objects.
 */
export const getLessons = async (levelId) => {
  try {
    const q = query(
      collection(db, "lessons"),
      where("levelId", "==", levelId),
      orderBy("order", "asc")
    );
    const querySnapshot = await getDocs(q);
    const lessons = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Ensure the 'id' property of the returned object is always doc.id
      // We can delete the internal 'id' if it exists to avoid confusion
      // or rename it to something like 'friendlyId' if you need it.
      // For simplicity, let's ensure doc.id is used and remove internal 'id'.
      delete data.id; // Remove the internal 'id' field from the data object
      return { id: doc.id, ...data }; // Use doc.id as the primary identifier
    });
    console.log(`Fetched ${lessons.length} lessons for ${levelId}.`);
    return lessons;
  } catch (error) {
    console.error(`Error fetching lessons for ${levelId}:`, error);
    throw error;
  }
};

/**
 * Fetches expert videos for a specific child growth level.
 * @param {string} levelId - The ID of the child growth level.
 * @returns {Array} An array of expert video objects.
 */
export const getExpertVideos = async (levelId) => {
  try {
    const q = query(
      collection(db, "expertVideos"),
      where("levelId", "==", levelId)
    );
    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map(doc => {
      const data = doc.data();
      delete data.id; // Remove internal 'id'
      return { id: doc.id, ...data };
    });
    console.log(`Fetched ${videos.length} videos for ${levelId}.`);
    return videos;
  } catch (error) {
    console.error(`Error fetching expert videos for ${levelId}:`, error);
    throw error;
  }
};

/**
 * Fetches game suggestions for a specific child growth level.
 * @param {string} levelId - The ID of the child growth level.
 * @returns {Array} An array of game suggestion objects.
 */
export const getGameSuggestions = async (levelId) => {
  try {
    const q = query(
      collection(db, "gameSuggestions"),
      where("levelId", "==", levelId)
    );
    const querySnapshot = await getDocs(q);
    const games = querySnapshot.docs.map(doc => {
      const data = doc.data();
      delete data.id; // Remove internal 'id'
      return { id: doc.id, ...data };
    });
    console.log(`Fetched ${games.length} games for ${levelId}.`);
    return games;
  } catch (error) {
    console.error(`Error fetching game suggestions for ${levelId}:`, error);
    throw error;
  }
};

// --- Functions to Fetch Single Documents ---

/**
 * Fetches a single lesson document by its ID.
 * @param {string} lessonId - The ID of the lesson document (Firestore's Auto-ID).
 * @returns {Object|null} The lesson object if found, otherwise null.
 */
export const getLessonById = async (lessonId) => {
  try {
    const docRef = doc(db, "lessons", lessonId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      delete data.id; // Remove internal 'id' here too, if it exists
      return { id: docSnap.id, ...data };
    } else {
      console.log("No such lesson document!");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching lesson by ID ${lessonId}:`, error);
    throw error;
  }
};

/**
 * Fetches a single expert video document by its ID.
 * @param {string} videoId - The ID of the video document (Firestore's Auto-ID).
 * @returns {Object|null} The video object if found, otherwise null.
 */
export const getVideoById = async (videoId) => {
  try {
    const docRef = doc(db, "expertVideos", videoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      delete data.id; // Remove internal 'id'
      return { id: docSnap.id, ...data };
    } else {
      console.log("No such video document!");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching video by ID ${videoId}:`, error);
    throw error;
  }
};

/**
 * Fetches a single game suggestion document by its ID.
 * @param {string} gameId - The ID of the game document (Firestore's Auto-ID).
 * @returns {Object|null} The game object if found, otherwise null.
 */
export const getGameById = async (gameId) => {
  try {
    const docRef = doc(db, "gameSuggestions", gameId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      delete data.id; // Remove internal 'id'
      return { id: docSnap.id, ...data };
    } else {
      console.log("No such game document!");
      return null;
    }
  } catch (error) {
    console.error(`Error fetching game by ID ${gameId}:`, error);
    throw error;
  }
};

// ... (rest of your firestore.js file, like markContentDone) ...