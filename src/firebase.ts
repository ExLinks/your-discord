/**
 * Firebase Configuration and Service Initialization
 * Central configuration for Firebase services used in the application
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/**
 * Firebase project configuration
 * Contains API keys and identifiers for the Firebase project
 */
const firebaseConfig = {
  apiKey: "AIzaSyBRV5jJRu7oQoQ9hNcmvcVdT6IzvvD7BF4",
  authDomain: "discord-clone-83b08.firebaseapp.com",
  projectId: "discord-clone-83b08",
  storageBucket: "discord-clone-83b08.appspot.com",
  messagingSenderId: "393399833089",
  appId: "1:393399833089:web:f60b51803644790a16e600",
};

// Initialize Firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize and export Firebase services
const firestoreDatabase = getFirestore(firebaseApp);
const authService = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

// Export initialized services for use throughout the application
export { authService as auth, googleAuthProvider as provider, firestoreDatabase as db };
// export default db;
