// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // 👈 1. IMPORT
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import App from './App';
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <React.Suspense fallback="Loading...">
        <HelmetProvider>
          <HashRouter>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </HashRouter>
        </HelmetProvider>
      </React.Suspense>
    </ThemeProvider>
  </React.StrictMode>
);