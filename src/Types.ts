/**
 * Core type definitions for authentication and channel management
 */

/**
 * User authentication state interface
 * Contains all user-related authentication information
 */
export interface UserAuthState {
  displayName: string;
  profileImageUrl: string | undefined;
  currentUser: null | {
    userId: string;
    profileImageUrl: string;
    emailAddress: string;
    displayName: string;
  };
}

/**
 * Application channel state interface
 * Tracks the active channel for messaging
 */
export interface ChannelState {
  activeChannelId: string | null;
  activeChannelName: string | null;
}
