/**
 * User Authentication Redux Slice
 * Manages user authentication state throughout the application
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthState } from "../Types";

/**
 * Initial user authentication state
 * Default state is unauthenticated with empty user fields
 */
const initialUserState: UserAuthState = {
  currentUser: null,
  displayName: "",
  profileImageUrl: undefined,
};

/**
 * User slice configuration with authentication actions
 */
export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  /* https://zenn.dev/luvmini511/articles/819d8c7fa13101 */
  reducers: {
    /**
     * Authenticate user with provided credentials
     * Sets user information in the global state
     */
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    
    /**
     * Sign out the current user
     * Resets user state to unauthenticated
     */
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

// Export actions for component usage
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
