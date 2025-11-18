// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../contexts/LanguageContext';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-gray-300
                     dark:bg-gray-950
                     transition-colors duration-300 ease-in-out">
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
    </footer>
  );
}

export default Footer;