/**
 * Channel Management Redux Slice
 * Handles the active channel selection and information
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelState } from "../Types";

/**
 * Initial channel state
 * No active channel selected by default
 */
const initialChannelState: ChannelState = {
  activeChannelId: null,
  activeChannelName: null,
};

/**
 * Channel slice for tracking user selected channels
 */
export const channelSlice = createSlice({
  name: "channel",
  initialState: initialChannelState,
  reducers: {
    /**
     * Update the active channel ID
     * @param state - Current channel state
     * @param action - Contains the channel ID to set
     */
    setChannelId: (state, action: PayloadAction<string>) => {
      state.activeChannelId = action.payload;
    },
    
    /**
     * Update both channel ID and name simultaneously
     * @param state - Current channel state
     * @param action - Contains channel ID and name to set
     */
    setChannelInfo: (state, action: PayloadAction<{channelId: string, channelName: string}>) => {
      state.activeChannelId = action.payload.channelId;
      state.activeChannelName = action.payload.channelName;
    },
  },
});

// Export actions for component usage
export const { setChannelId, setChannelInfo } = channelSlice.actions;

export default channelSlice.reducer;
