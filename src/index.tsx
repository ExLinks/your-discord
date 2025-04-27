/**
 * Application Entry Point
 * Initializes React application with Redux store integration
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

/**
 * Create root element for React application
 * Uses the modern React 18 createRoot API
 */
const rootElement = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/**
 * Render the application within StrictMode for better development experience
 * Wrap with Redux Provider to enable state management
 */
rootElement.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
