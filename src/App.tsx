/**
 * Application Root Component
 * Manages authentication state and renders appropriate UI components
 */
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.scss";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import Chat from "./components/Chat";
import { ErrorFallback } from "./components/ErrorFallBack";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { Suspense } from "react";

/**
 * Main Application Component
 * Controls the application flow based on authentication state
 */
function App() {
  // Select the authenticated user from Redux store
  const authenticatedUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  /**
   * Authentication state listener
   * Monitors user authentication changes and updates Redux store
   */
  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged((authUserData) => {
      if (authUserData) {
        // User is signed in - update Redux with user data
        dispatch(
          login({
            userId: authUserData.uid,
            profileImageUrl: authUserData.photoURL,
            emailAddress: authUserData.email,
            displayName: authUserData.displayName,
          })
        );
      } else {
        // User is signed out - clear user data in Redux
        dispatch(logout());
      }
    });

    // Cleanup subscription when component unmounts
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      {authenticatedUser ? (
        // Authenticated user view
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        // Unauthenticated user view
        <Login />
      )}
    </div>
  );
}

export default App;
