import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// This helper checks if we are running on the live server (production) or localhost
// If production, we add the repo name. If localhost, we don't.
const loadPath = process.env.NODE_ENV === 'production'
  ? '/NexusSolution/locales/{{lng}}/translation.json'
  : '/locales/{{lng}}/translation.json';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es', 'fr', 'zh'],
    fallbackLng: 'en',
    debug: false,

    backend: {
      // 👇 USE THE VARIABLE WE MADE ABOVE
      loadPath: loadPath,
    },

    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    react: { useSuspense: false }
  });

export default i18n;