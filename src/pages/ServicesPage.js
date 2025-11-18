// src/pages/ServicesPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { client } from '../client'; 
import ProcessSteps from '../components/ProcessSteps';
import { useTranslation } from '../contexts/LanguageContext';

// Icon map
const iconMap = {
  'custom-software-development': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-3 16.5" />
    </svg>
  ),
  'cloud-devops-infrastructure': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.75-3.75 3 3 0 0 0-3.75 3.75H7.5a4.5 4.5 0 0 0-5.25 4.5Z" />
    </svg>
  ),
  'data-science-ai': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5M15.75 3v1.5M8.25 19.5V21M12 19.5V21M15.75 19.5V21M19.5 8.25H21M19.5 12H21M19.5 15.75H21M4.5 8.25H3M4.5 12H3M4.5 15.75H3M12 8.25v7.5M8.25 12h7.5" />
    </svg>
  ),
};

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

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

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

// --- FLOATING PARTICLES BACKGROUND ---
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
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

// --- ANIMATED LIST ITEM COMPONENT ---
function AnimatedListItem({ children, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.6, delay: index * 0.15, ease: "easeOut" } 
    },
  };
  
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}

// --- MAIN SERVICES PAGE COMPONENT ---
function ServicesPage() {
  const { t, language } = useTranslation();
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    // Fetch BOTH English and Malay fields
    const query = `*[_type == "service"] | order(orderRank asc) {
      title,
      title_ms,
      description,
      description_ms,
      "slug": slug.current
    }`;
    
    client.fetch(query)
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const renderServiceContent = () => {
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
            {t('servicesPage.error')}
          </p>
        </motion.div>
      );
    }
    
    return (
      <div className="space-y-24">
        {services && services.map((service, index) => (
          <AnimatedListItem key={service.slug} index={index}>
            <motion.div 
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg 
                       border-2 border-gray-100 dark:border-gray-700 
                       hover:border-blue-500 dark:hover:border-blue-400
                       hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
                       transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8, scale: 1.01 }}
            >
              {/* Card Content */}
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Icon with enhanced styling */}
                  <motion.div 
                    className="flex-shrink-0 p-6 bg-gradient-to-br from-blue-100 to-blue-200 
                             text-blue-600 dark:from-blue-900/50 dark:to-blue-800/50 
                             dark:text-blue-300 rounded-2xl shadow-lg
                             group-hover:shadow-xl group-hover:scale-110
                             transition-all duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {iconMap[service.slug]}
                  </motion.div>
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white
                                 group-hover:text-blue-600 dark:group-hover:text-blue-400
                                 transition-colors duration-300">
                      {language === 'ms' && service.title_ms ? service.title_ms : service.title}
                    </h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4 mb-6"
                    />
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {language === 'ms' && service.description_ms ? service.description_ms : service.description}
                    </p>
                  </div>
                </div>

                {/* Process Steps Section */}
                <div className="pt-12 mt-12 border-t-2 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg
                                  bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {t('servicesPage.processTitle')} {language === 'ms' && service.title_ms ? service.title_ms : service.title}
                    </h4>
                  </div>
                  <ProcessSteps serviceSlug={service.slug} /> 
                </div>
              </div>

              {/* Bottom gradient bar */}
              <motion.div 
                className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
          </AnimatedListItem>
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      <Helmet>
        <title>{t('servicesPage.title')} | Nexus Solutions</title>
        <meta 
          name="description" 
          content={t('servicesPage.subtitle')}
        />
      </Helmet>

      {/* Hero Header Section with Parallax */}
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
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full 
                     mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{
            y: [0, -20, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full 
                     mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{
            y: [0, 20, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
        
        <div className="relative z-10 container mx-auto px-6">
          <AnimatedSection variants={fadeInVariants}>
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full 
                             bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                             text-sm font-semibold">
                💼 Our Expertise
              </span>
            </motion.div>

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
              {t('servicesPage.title')}
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-200 
                         max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t('servicesPage.subtitle')}
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

      {/* Detailed Services List */}
      <section className="bg-gradient-to-b from-gray-50 to-white 
                          dark:from-gray-800 dark:to-gray-900 
                          py-20 md:py-32 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {renderServiceContent()}
        </div>
      </section>

      {/* Call to Action Section */}
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
              {t('servicesPage.ctaTitle')}
            </h2>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
              {t('servicesPage.ctaSubtitle')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to="/#contact" 
                className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg 
                         rounded-full shadow-2xl hover:bg-gray-50 
                         transition-all duration-300"
              >
                {t('servicesPage.ctaButton')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;