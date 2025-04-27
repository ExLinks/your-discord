/**
 * Custom Redux Hooks
 * Type-safe hooks for Redux state management
 */
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";

/**
 * Type-safe version of useDispatch hook
 * Pre-configured with the correct dispatch type
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Type-safe version of useSelector hook
 * Auto-completes state properties and ensures type safety
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
