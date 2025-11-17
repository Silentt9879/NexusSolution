// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { HashLink } from 'react-router-hash-link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; 
import { ThemeToggle } from './ThemeToggle'; 

// --- 1. Language Data ---
// We create an object for our languages
const languages = [
  { code: 'en', name: 'English', shortName: 'EN' },
  { code: 'ms', name: 'Malay', shortName: 'MS' },
  { code: 'zh-CN', name: 'Mandarin', shortName: 'CN' },
  { code: 'ta', name: 'Tamil', shortName: 'TA' },
];

// --- 2. Custom Language Dropdown Component ---
const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('EN');

  // --- 3. This function handles the language change ---
  const handleLanguageChange = (langCode, shortName) => {
    
    // Set the cookie for Google Translate
    // This tells Google what language to translate *to*
    document.cookie = `googtrans=/en/${langCode};path=/;domain=${window.location.hostname}`;
    
    // Update our React state to show the new language
    setCurrentLang(shortName);

    // Reload the page to apply the translation
    // This is the simplest way to make Google Translate re-scan the page.
    window.location.reload();
  };

  // 4. This effect checks the cookie when the page loads
  // It ensures our button shows the correct current language
  useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const langCookie = cookies['googtrans'];
    if (langCookie) {
      const langCode = langCookie.split('/')[2];
      const lang = languages.find(l => l.code === langCode);
      if (lang) {
        setCurrentLang(lang.shortName);
      }
    }
  }, []);

  // --- 5. This is our new, custom-styled dropdown ---
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium focus:outline-none">
           {/* Globe Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span>{currentLang}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content 
        className="
          bg-white shadow-md rounded-md
          dark:bg-gray-800 dark:border-gray-700
          border border-gray-200
          mt-2 w-32 z-[9999]
          data-[side=top]:animate-slideDownAndFade
          data-[side=bottom]:animate-slideUpAndFade
        "
        align="end"
      >
        {languages.map((lang) => (
          <DropdownMenu.Item 
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code, lang.shortName)}
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none"
          >
            {lang.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};


function Navbar() {
  return (
    <header className="bg-white shadow-sm relative dark:bg-gray-800 
                       border-b border-gray-100 dark:border-gray-700
                       transition-colors duration-300 ease-in-out"> 
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Nexus Solutions
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            Services
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">About Us</Link>
          <Link to="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">Blog</Link>

          <HashLink smooth to="/#contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium">
            Contact
          </HashLink>
          <HashLink 
            smooth 
            to="/#contact" 
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </HashLink>

          <ThemeToggle />

          {/* --- 6. Add our new custom component --- */}
          <LanguageSwitcher />

        </div>
        {/* --- End Desktop Navigation --- */}


        {/* --- RADIX MOBILE MENU --- */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />

          {/* --- 7. Add our new custom component here too --- */}
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
                  Home
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/services" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Services
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/about" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  About Us
                </Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item asChild>
                <Link to="/blog" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Blog
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <HashLink smooth to="/#contact" className="block px-6 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer outline-none">
                  Contact
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
                  Get Started
                </HashLink>
              </DropdownMenu.Item>

            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        {/* --- END RADIX MOBILE MENU --- */}

      </nav>
    </header>
  );
}

export default Navbar;