// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from '../contexts/LanguageContext';

// --- COMPONENTS ---

// 1. Premium Language Switcher
const LanguageSwitcher = () => {
  const { language, changeLanguage } = useTranslation();
  return (
    <button
      onClick={() => changeLanguage(language === 'en' ? 'ms' : 'en')}
      className="relative flex items-center justify-center w-10 h-10 rounded-full 
                 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                 transition-colors"
    >
      <span className="font-bold text-xs tracking-wider">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

// 2. Desktop Nav Link with "Sliding Spotlight"
const NavLinks = ({ t }) => {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  const links = [
    { path: "/", label: t('navbar.home') },
    { path: "/services", label: t('navbar.services') },
    { path: "/about", label: t('navbar.about') },
    { path: "/blog", label: t('navbar.blog') },
    { path: "/#contact", label: t('navbar.contact'), isHash: true },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      {links.map((link) => {
        const isActive = hoveredPath === link.path;
        const LinkComponent = link.isHash ? HashLink : Link;

        return (
          <LinkComponent
            key={link.path}
            to={link.path}
            smooth={link.isHash}
            className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 z-10
              ${isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
            onMouseEnter={() => setHoveredPath(link.path)}
          >
            {/* The Magic Sliding Background */}
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full shadow-sm"
                style={{ zIndex: -1 }}
              />
            )}
            {link.label}
          </LinkComponent>
        );
      })}
    </div>
  );
};

// 3. Main Navbar Component
function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center">

          {/* --- LOGO SECTION --- */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Animated Logo Icon */}
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {/* Glow effect behind the logo */}
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              <img
                src="/favicon.ico"
                alt="Nexus Logo"
                className="relative w-full h-full object-contain"
              />
            </div>

            {/* Modern Gradient Text */}
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent 
                  bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                  dark:from-blue-400 dark:via-purple-400 dark:to-blue-400
                  bg-[length:200%_auto] hover:animate-pulse transition-all duration-300">
              Nexus Solutions
            </span>
          </Link>

          {/* --- DESKTOP CENTER LINKS --- */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <NavLinks t={t} />
          </div>

          {/* --- DESKTOP RIGHT ACTIONS --- */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-4 mr-1">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            <HashLink smooth to="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                {t('navbar.getStarted')}
              </motion.button>
            </HashLink>
          </div>

          {/* --- MOBILE HAMBURGER --- */}
          <button
            className="md:hidden relative z-50 p-2 text-gray-800 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`} />
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'mb-1.5'}`} />
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </nav>
      </motion.header>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8 text-2xl font-bold text-gray-900 dark:text-white">
              {[
                { path: "/", label: t('navbar.home') },
                { path: "/services", label: t('navbar.services') },
                { path: "/about", label: t('navbar.about') },
                { path: "/blog", label: t('navbar.blog') },
                { path: "/#contact", label: t('navbar.contact') },
              ].map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 mt-8"
              >
                <ThemeToggle />
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;