/**
 * Authentication Component
 * Handles user sign-in functionality using Google authentication
 */
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";
import "./Login.scss";

/**
 * Login component that provides Google Authentication
 * Displays Discord logo and sign-in button
 */
const LoginScreen: React.FC = () => {
  /**
   * Initiates Google sign-in flow using Firebase
   * Shows error alert if authentication fails
   */
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        // Authentication successful - Redux handles state update
      })
      .catch((error) => {
        // Display error message if authentication fails
        alert(error.message);
      });
  };

  return (
    <div className="login">
      {/* <h2>ログインページです。</h2> */}

      <div className="loginLogo">
        <img src="./discordLogo.png" alt="Discord Logo" />
      </div>

      <Button variant="contained" onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
    </div>
  );
};

export default LoginScreen;
