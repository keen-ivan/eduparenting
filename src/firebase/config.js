import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// My web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD__geWwUqdWvENphKD6131C3kAwYSr0II",
  authDomain: "eduparenting-3b7fa.firebaseapp.com",
  projectId: "eduparenting-3b7fa",
  storageBucket: "eduparenting-3b7fa.firebasestorage.app",
  messagingSenderId: "10027353311",
  appId: "1:10027353311:web:cfdedc189c69b4cf7b156a",
  measurementId: "G-09XTLVJBL5"
};

// Initialize firebase
const app = initializeApp(firebaseConfig);

// Get sevice instances
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

