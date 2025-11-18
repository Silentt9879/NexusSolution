// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from '../contexts/LanguageContext';

// Simple Language Switcher Component (EN/MS only)
const LanguageSwitcher = () => {
  const { language, changeLanguage } = useTranslation();

  return (
    <button
      onClick={() => changeLanguage(language === 'en' ? 'ms' : 'en')}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg
                 text-gray-600 hover:text-blue-600 hover:bg-blue-50
                 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800
                 font-medium focus:outline-none transition-colors duration-200"
      title={language === 'en' ? 'Switch to Malay' : 'Tukar ke Bahasa Inggeris'}
    >
      {/* Globe Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      <span className="font-semibold">{language.toUpperCase()}</span>
    </button>
  );
};

function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm relative dark:bg-gray-800
                       border-b border-gray-100 dark:border-gray-700
                       transition-colors duration-300 ease-in-out">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
       
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Nexus Solutions
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            {t('navbar.home')}
          </Link>
          <Link to="/services" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            {t('navbar.services')}
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            {t('navbar.about')}
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            {t('navbar.blog')}
          </Link>

          <HashLink smooth to="/#contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            {t('navbar.contact')}
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            {t('navbar.getStarted')}
          </HashLink>

          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          
          <div className="ml-3">
            <LanguageSwitcher />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="text-gray-800 dark:text-gray-200 text-3xl focus:outline-none ml-2">
                ☰
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="
                absolute right-0 mt-2 w-48 z-[9999]
                bg-white shadow-md rounded-md
                dark:bg-gray-800 dark:border-gray-700
                border border-gray-200
                data-[side=top]:animate-slideDownAndFade
                data-[side=bottom]:animate-slideUpAndFade
              "
            >
              <DropdownMenu.Item asChild>
                <Link to="/" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  {t('navbar.home')}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/services" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  {t('navbar.services')}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/about" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  {t('navbar.about')}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/blog" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  {t('navbar.blog')}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <HashLink smooth to="/#contact" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  {t('navbar.contact')}
                </HashLink>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-600" />
              <DropdownMenu.Item asChild>
                <HashLink
                  smooth
                  to="/#contact"
                  className="block px-6 py-4 bg-blue-600 text-white text-center font-medium
                               hover:bg-blue-700 cursor-pointer outline-none"
                >
                  {t('navbar.getStarted')}
                </HashLink>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;