// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // 👈 1. IMPORT
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import App from './App';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <React.Suspense fallback="Loading...">
        <HelmetProvider> {/* 👈 2. WRAP YOUR APP */}
          <BrowserRouter basename="/NexusSolution">
            <App />
          </BrowserRouter>
        </HelmetProvider> {/* 👈 2. END WRAP */}
      </React.Suspense>
    </ThemeProvider>
  </React.StrictMode>
);