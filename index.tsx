
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
if (!convexUrl) {
  console.error("CRITICAL ERROR: VITE_CONVEX_URL is not defined. Please add it to your environment variables.");
}
const convex = new ConvexReactClient(convexUrl as string);


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
