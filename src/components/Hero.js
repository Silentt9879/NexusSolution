// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// 👇 THIS IS THE CHANGE
// We're pointing to the 'public' folder, and 'process.env.PUBLIC_URL' makes it work live.
const videoURL = process.env.PUBLIC_URL + "/videos/stockvideo.mp4";
// This will become "/NexusSolution/videos/stockvideo.mp4" on your live site.

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    // 1. The main container is now 'relative' to position the video inside it
    <div className="relative overflow-hidden
                    transition-colors duration-300 ease-in-out">
      
      {/* 2. This is the background video */}
      <video
        src={videoURL} // 👈 This now uses the correct URL
        autoPlay
        loop
        muted
        playsInline // Important for iOS devices
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* 3. This is the dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

      {/* 4. Your content now has a z-20 to sit on top of everything */}
      <motion.div
        className="relative z-20 container mx-auto px-6 py-40 text-center" // Increased padding
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* 5. Text is now white, and stays white in dark mode */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          variants={itemVariants}
        >
          Accelerate Your Digital Transformation
        </motion.h1>

        {/* 5. Sub-text is now a light gray/blue */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          We build cutting-edge software solutions that drive growth, 
          efficiency, and innovation for your business.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center 
                         space-y-4 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <Link to="/services" className="bg-blue-600 text-white px-8 py-3 
                                          rounded-lg text-lg font-medium 
                                          hover:bg-blue-700 transition duration-300">
            Our Services
          </Link>
          
          {/* 6. "Learn More" button is now styled to be transparent (a "ghost" button) */}
          <HashLink 
            smooth 
            to="/#services" 
            className="bg-transparent text-white border border-white 
                       px-8 py-3 rounded-lg text-lg font-medium 
                       hover:bg-white hover:text-gray-900 transition duration-300"
          >
            Learn More
          </HashLink>

        </motion.div>

      </motion.div>
    </div>
  );
}

export default Hero;