// src/contexts/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '../translations/en.json';
import ms from '../translations/ms.json';

// Create context
const LanguageContext = createContext();

// Translation data
const translations = {
  en,
  ms
};

// Language Context Provider
export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('nexus-language');
    return savedLang || 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nexus-language', language);
  }, [language]);

  // Function to change language
  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
    }
  };

  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key; // Return the key if translation is missing
      }
    }
    
    return value;
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};