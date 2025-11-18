// src/components/Services.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client } from '../client';
import { useTranslation } from '../contexts/LanguageContext';

// Icon map
const iconMap = {
  'custom-software-development': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-3 16.5" />
    </svg>
  ),
  'cloud-devops-infrastructure': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.75-3.75 3 3 0 0 0-3.75 3.75H7.5a4.5 4.5 0 0 0-5.25 4.5Z" />
    </svg>
  ),
  'data-science-ai': (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M12 3v1.5M15.75 3v1.5M8.25 19.5V21M12 19.5V21M15.75 19.5V21M19.5 8.25H21M19.5 12H21M19.5 15.75H21M4.5 8.25H3M4.5 12H3M4.5 15.75H3M12 8.25v7.5M8.25 12h7.5" />
    </svg>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

function Services() {
  const { t, language } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch BOTH English and Malay fields
    const query = `*[_type == "service"] | order(orderRank asc) {
      title,
      title_ms,
      shortDescription,
      shortDescription_ms,
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

  const renderServicesContent = () => {
    if (isLoading) {
      return <p className="text-center text-lg text-gray-600 dark:text-gray-300">{t('services.loading')}</p>;
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 dark:bg-red-950 rounded-lg">
          <p className="text-lg text-red-600 dark:text-red-200">
            {t('services.error')}
          </p>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {services && services.map((service) => (
          <motion.div
            key={service.slug}
            className="bg-gray-50 p-8 rounded-lg shadow-lg 
                       hover:shadow-xl hover:-translate-y-2 
                       transition-all duration-300 ease-in-out
                       dark:bg-gray-800 dark:shadow-2xl"
            variants={itemVariants}
          >
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              {iconMap[service.slug]}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {language === 'ms' && service.title_ms ? service.title_ms : service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'ms' && service.shortDescription_ms ? service.shortDescription_ms : service.shortDescription}
            </p>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <section 
      id="services"
      className="bg-white py-20 md:py-28
                 dark:bg-gray-900
                 transition-colors duration-300 ease-in-out">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            {t('services.badge')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        {renderServicesContent()}
      </div>
    </section>
  );
}

export default Services;