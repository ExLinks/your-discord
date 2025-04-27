import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import channelReducer from "../features/appSlice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

/**
 * Redux store configuration
 * Centralizes application state with combined reducers
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
  },
});

/**
 * Type definitions for Redux interactions
 * Enables proper type safety when dispatching actions and selecting state
 */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
