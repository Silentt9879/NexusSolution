import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Loads translations from your /public folder
  .use(LanguageDetector) // Detects user language (e.g., from browser settings)
  .use(initReactI18next) // Passes i18n down to React
  .init({
    supportedLngs: ['en', 'es', 'fr', 'zh'], // English, Spanish, French, Chinese
    fallbackLng: 'en',
    debug: false,
    // Where to find the translation files
    backend: {
      loadPath: '/NexusSolution/locales/{{lng}}/translation.json', 
      // ^ NOTE: Since you use GitHub Pages with a repo name (NexusSolution), 
      // we might need the repo prefix. If testing locally, use '/locales/{{lng}}/translation.json'
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    react: { useSuspense: false }
  });

export default i18n;