// src/i18n.js
// This is the main configuration file for the translation library

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Use the 'http-backend' to load translation files from your /public folder
  .use(HttpApi)
  // Detect user's language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize the configuration
  .init({
    // Default language
    fallbackLng: 'en',
    debug: false, // Set to true to see logs in console

    // Define which languages are supported
    // The 'translation' key is the default namespace
    supportedLngs: ['en', 'ms', 'zh-CN', 'ta'],

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },

    // Options for the 'http-backend'
    backend: {
      loadPath: '/NexusSolution/locales/{{lng}}/translation.json',
    },
    
    // Options for the language detector
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'], // Cache the selected language
    },
  });

export default i18n;