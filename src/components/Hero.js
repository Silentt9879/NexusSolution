// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// --- 1. IMPORT THE TRANSLATION HOOK ---
import { useTranslation } from 'react-i18next';

const videoURL = process.env.PUBLIC_URL + "/videos/stockvideo.mp4";

function Hero() {
  // --- 2. GET THE 't' (TRANSLATE) FUNCTION ---
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="relative overflow-hidden
                    transition-colors duration-300 ease-in-out">
      
      <video
        src={videoURL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

      <motion.div
        className="relative z-20 container mx-auto px-6 py-40 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          variants={itemVariants}
        >
          {/* --- 3. USE THE 't' FUNCTION --- */}
          {t('hero_title')}
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {/* --- 4. USE THE 't' FUNCTION --- */}
          {t('hero_subtitle')}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center 
                         space-y-4 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <Link to="/services" className="bg-blue-600 text-white px-8 py-3 
                                          rounded-lg text-lg font-medium 
                                          hover:bg-blue-700 transition duration-300">
            {/* --- 5. USE THE 't' FUNCTION --- */}
            {t('hero_services_button')}
          </Link>
          
          <HashLink 
            smooth 
            to="/#services" 
            className="bg-transparent text-white border border-white 
                       px-8 py-3 rounded-lg text-lg font-medium 
                       hover:bg-white hover:text-gray-900 transition duration-300"
          >
            {/* --- 6. USE THE 't' FUNCTION --- */}
            {t('hero_learn_more_button')}
          </HashLink>

        </motion.div>

      </motion.div>
    </div>
  );
}

export default Hero;