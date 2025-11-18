// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; 
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HashLink } from 'react-router-hash-link';
import { client, urlFor } from '../client';

// --- ENHANCED ANIMATION VARIANTS ---
const fadeInVariants = { 
  hidden: { y: 20, opacity: 0 }, 
  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } } 
};

const slideInLeftVariants = { 
  hidden: { x: -100, opacity: 0 }, 
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } 
};

const slideInRightVariants = { 
  hidden: { x: 100, opacity: 0 }, 
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } 
};

const cardContainerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
};

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Floating animation for background elements
const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Timeline animation variants
const timelineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.2,
      ease: "easeOut"
    }
  })
};

// Scale in variants
const scaleInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- ANIMATED SECTION COMPONENT ---
function AnimatedSection({ children, variants, className = "" }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- ANIMATED COUNTER COMPONENT ---
function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- FLOATING PARTICLES BACKGROUND ---
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    animationDuration: Math.random() * 10 + 10,
    animationDelay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500 opacity-20 dark:bg-blue-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: '100%',
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.animationDuration,
            repeat: Infinity,
            delay: particle.animationDelay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// --- TIMELINE COMPONENT ---
function TimelineSection() {
  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Nexus Solutions was born with a vision to revolutionize software development.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      year: "2021",
      title: "First Major Client",
      description: "Secured our first enterprise client and delivered a transformative solution.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      year: "2022",
      title: "Team Expansion",
      description: "Grew our team to 15+ talented developers, designers, and strategists.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      year: "2023",
      title: "100+ Projects Milestone",
      description: "Successfully completed over 100 projects across multiple industries.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      year: "2024",
      title: "Innovation Award",
      description: "Received industry recognition for our cutting-edge AI-powered solutions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Opened new offices and expanded our reach to international markets.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full 
                           bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                           text-sm font-semibold">
              📅 Our Journey
            </span>
          </motion.div>
          
          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Our Timeline
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From humble beginnings to industry leaders - here's our journey.
            </p>
          </AnimatedSection>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 
                          w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                custom={index}
                variants={timelineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row items-center gap-8 
                           ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl 
                                border-2 border-blue-100 dark:border-gray-700 
                                hover:border-blue-500 dark:hover:border-blue-400 
                                transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-3
                                  ${index % 2 === 0 ? 'md:flex-row-reverse md:justify-start' : 'justify-start'}`}>
                      {/* Icon with circular background */}
                      <div className="flex items-center justify-center w-14 h-14 rounded-full
                                    bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {milestone.icon}
                      </div>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  className="hidden md:flex w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 
                           rounded-full items-center justify-center shadow-lg z-10
                           border-4 border-white dark:border-gray-900"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 bg-white rounded-full"
                  />
                </motion.div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MISSION & VISION COMPONENT ---
function MissionVision() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-20 md:py-32 relative overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <AnimatedSection variants={slideInLeftVariants}>
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 
                       border border-white/20 shadow-2xl h-full"
            >
              <div className="flex items-center justify-center w-20 h-20 mb-6
                            rounded-full bg-white/20 text-white">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Our Mission
              </h3>
              <p className="text-lg text-blue-50 leading-relaxed">
                To empower businesses of all sizes with innovative, accessible technology 
                solutions that drive growth, efficiency, and success. We believe every 
                company deserves world-class software that works seamlessly.
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 bg-white/50 rounded-full mt-6"
              />
            </motion.div>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection variants={slideInRightVariants}>
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 
                       border border-white/20 shadow-2xl h-full"
            >
              <div className="flex items-center justify-center w-20 h-20 mb-6
                            rounded-full bg-white/20 text-white">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Our Vision
              </h3>
              <p className="text-lg text-blue-50 leading-relaxed">
                To be the global leader in transformative software solutions, recognized 
                for innovation, quality, and client success. We envision a future where 
                technology barriers no longer exist, and every business can thrive digitally.
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 bg-white/50 rounded-full mt-6"
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// --- CORE VALUES COMPONENT ---
function CoreValues() {
  const values = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovation First",
      description: "We constantly push boundaries and embrace cutting-edge technologies to deliver tomorrow's solutions today."
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Client Partnership",
      description: "Your success is our success. We build lasting relationships based on trust, transparency, and results."
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Excellence",
      description: "We maintain the highest standards in every line of code, every design, and every interaction."
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Integrity",
      description: "We operate with honesty and ethical practices, always doing what's right for our clients and team."
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Agility",
      description: "We adapt quickly to changes, embrace challenges, and deliver solutions with speed and precision."
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Continuous Learning",
      description: "We invest in our team's growth and stay ahead of industry trends to serve you better."
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full 
                           bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 
                           text-sm font-semibold">
              💎 What Drives Us
            </span>
          </motion.div>
          
          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide every decision and drive our success.
            </p>
          </AnimatedSection>
        </div>

        {/* Values Grid */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg
                       border-2 border-gray-100 dark:border-gray-700
                       hover:border-purple-500 dark:hover:border-purple-400
                       hover:shadow-2xl hover:shadow-purple-500/20
                       transition-all duration-300 group"
            >
              {/* Icon with circular background */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6 inline-flex items-center justify-center
                         w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30
                         text-purple-600 dark:text-purple-400
                         group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50
                         transition-all duration-300"
              >
                {value.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3
                           group-hover:text-purple-600 dark:group-hover:text-purple-400
                           transition-colors duration-300">
                {value.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {value.description}
              </p>

              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---
function AboutPage() {
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const query = '*[_type == "teamMember"] | order(orderRank asc){ name, role, image }';
    client.fetch(query)
      .then((data) => {
        setTeam(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching team:', err);
        setError(err);
        setIsLoading(false);
      });
  }, []); 

  const renderTeamContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }
    
    if (error) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-red-50 dark:bg-red-950 rounded-lg border-2 border-red-200 dark:border-red-800"
        >
          <p className="text-lg text-red-600 dark:text-red-200">
            Sorry, we couldn't load the team at this time.
          </p>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team && team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden
                         dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl
                         hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              
              {/* Team Member Image with zoom effect */}
              <div className="relative overflow-hidden h-72">
                <motion.img 
                  src={urlFor(member.image).width(400).height(400).url()} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Animated border glow */}
                <motion.div 
                  className="absolute inset-0 border-4 border-blue-500 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="relative p-6 z-20">
                {/* Team Member Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white
                             group-hover:text-white transition-colors duration-300">
                  {member.name}
                </h3>
                {/* Team Member Role */}
                <p className="text-blue-600 dark:text-blue-400 font-medium mt-1
                            group-hover:text-blue-100 transition-colors duration-300">
                  {member.role}
                </p>
                
                {/* Animated underline */}
                <motion.div 
                  className="h-1 bg-blue-500 mt-4 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      <Helmet>
        <title>About Us | Nexus Solutions</title>
        <meta 
          name="description" 
          content="Meet the passionate team of developers, designers, and strategists at Nexus Solutions, dedicated to solving real-world problems." 
        />
      </Helmet>

      {/* 1. HERO HEADER SECTION with Parallax */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                   dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 
                   py-32 text-center overflow-hidden"
      >
        {/* Floating Particles Background */}
        <FloatingParticles />
        
        {/* Animated gradient orbs */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full 
                     mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full 
                     mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        />
        
        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection variants={fadeInVariants}>
            {/* Animated gradient text */}
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-6 
                         bg-clip-text text-transparent bg-gradient-to-r 
                         from-blue-600 via-purple-600 to-pink-600
                         dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              About Nexus Solutions
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-200 
                         max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We're a passionate team dedicated to building software
              that solves real-world problems.
            </motion.p>
            
            {/* Animated scroll indicator */}
            <motion.div
              className="mt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-blue-600 dark:border-blue-400 
                            rounded-full mx-auto flex items-start justify-center p-2">
                <motion.div 
                  className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </motion.div>

      {/* 2. STATS SECTION - NEW! */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardContainerVariants}
          >
            {[
              { label: "Years Experience", value: 5, suffix: "+" },
              { label: "Projects Completed", value: 150, suffix: "+" },
              { label: "Happy Clients", value: 100, suffix: "+" },
              { label: "Team Members", value: 25, suffix: "+" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                variants={fadeInVariants}
                className="p-6"
              >
                <motion.div 
                  className="text-5xl md:text-6xl font-extrabold mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </motion.div>
                <p className="text-blue-100 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. OUR STORY SECTION with Enhanced Animations */}
      <section className="bg-white py-20 md:py-32 dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image with 3D effect */}
            <AnimatedSection variants={slideInLeftVariants}>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 
                              rounded-2xl blur opacity-25 group-hover:opacity-75 
                              transition duration-500" />
                
                <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070" 
                    alt="Our office" 
                    className="w-full h-96 object-cover transform group-hover:scale-105 
                             transition-transform duration-500" 
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                </div>
              </motion.div>
            </AnimatedSection>
            
            {/* Text content */}
            <AnimatedSection variants={slideInRightVariants}>
              <div className="space-y-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8 }}
                  className="h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                />
                
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                  Our Story
                </h2>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Founded in 2020, Nexus Solutions began with a simple idea: to
                  make powerful technology accessible and simple for businesses of all sizes.
                </motion.p>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  We saw too many companies struggling with outdated, inefficient
                  systems. We knew there was a better way. Today, we're a thriving team
                  of developers, designers, and strategists who are passionate about
                  building cutting-edge solutions that drive real growth and innovation.
                </motion.p>
                
                {/* Feature highlights */}
                <motion.div 
                  className="grid grid-cols-2 gap-4 pt-6"
                  initial="hidden"
                  whileInView="visible"
                  variants={cardContainerVariants}
                >
                  {[
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ), 
                      text: "Innovation First" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      ), 
                      text: "Creative Solutions" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      ), 
                      text: "Goal Oriented" 
                    },
                    { 
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      ), 
                      text: "Client Focused" 
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center space-x-3 p-4 rounded-xl 
                               bg-blue-50 dark:bg-gray-800 
                               border border-blue-100 dark:border-gray-700
                               cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg
                                    bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
                                    flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. TIMELINE SECTION */}
      <TimelineSection />

      {/* 5. MISSION & VISION SECTION */}
      <MissionVision />

      {/* 6. CORE VALUES SECTION */}
      <CoreValues />

      {/* 7. MEET THE TEAM SECTION */}
      <section className="bg-gradient-to-b from-gray-50 to-white 
                          dark:from-gray-800 dark:to-gray-900 
                          py-20 md:py-32 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full 
                             bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                             text-sm font-semibold">
                👥 Our Team
              </span>
            </motion.div>
            
            <AnimatedSection variants={fadeInVariants}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Meet Our Leadership
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 
                          max-w-2xl mx-auto">
                The dedicated minds behind our innovation.
              </p>
            </AnimatedSection>
          </div>
          
          {/* Team Grid */}
          {renderTeamContent()}
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                          py-20 text-center text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
              Let's build something amazing together. Get in touch with our team today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <HashLink
                smooth
                to="/#contact"
                className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg 
                         rounded-full shadow-2xl hover:bg-gray-50 
                         transition-all duration-300"
              >
                Get Started
              </HashLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;