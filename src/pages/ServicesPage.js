// src/pages/ServicesPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { client } from '../client'; 
import ProcessSteps from '../components/ProcessSteps'; // 👈 NEW IMPORT

// --- ICON MAP ---
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

// --- ANIMATION VARIANTS ---
const fadeInVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7 } } };
function AnimatedListItem({ children, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: index * 0.2 } },
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// --- MAIN PAGE COMPONENT ---
function ServicesPage() {
  const [services, setServices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We are still fetching only basic data, but the new component uses the slug to get process data
    const query = '*[_type == "service"]{ title, "slug": slug.current, description }'; 
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
      return <p className="text-center text-lg text-gray-600 dark:text-gray-300">Loading services...</p>;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 dark:bg-red-950 rounded-lg">
          <p className="text-lg text-red-600 dark:text-red-200">
            Sorry, we couldn't load our services at this time.
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-24"> {/* Increased spacing */}
        {services && services.map((service, index) => (
          <AnimatedListItem key={service.slug} index={index}>
            {/* EXISTING Service Title & Description Block */}
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0 p-4 bg-blue-100 text-blue-600 
                                 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                {iconMap[service.slug]}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
                  {service.description}
                </p>
              </div>
            </div>

            {/* NEW: Process Steps Component */}
            <div className="pt-12 mt-12 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                    Our Process for {service.title}
                </h4>
                {/* Passes the slug to the ProcessSteps component */}
                <ProcessSteps serviceSlug={service.slug} /> 
            </div>
          </AnimatedListItem>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Our Services | Nexus Solutions</title>
        <meta 
          name="description" 
          content="Explore our expert services: Custom Software Development, Cloud & DevOps Infrastructure, and Data Science & AI." 
        />
      </Helmet>

      {/* 1. Hero Header Section */}
      <motion.div 
        className="bg-blue-50 py-20 text-center 
                  dark:bg-blue-950
                  transition-colors duration-300 ease-in-out"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
          Our Services
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-blue-200 max-w-2xl mx-auto">
          Comprehensive solutions to accelerate your digital transformation.
        </p>
      </motion.div>

      {/* 2. Detailed Services List */}
      <section className="bg-white py-20 md:py-28 
                          dark:bg-gray-900
                          transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-6">
          {renderServiceContent()}
        </div>
      </section>

      {/* 3. Call to Action Section */}
      <section className="bg-gray-900 
                          dark:bg-gray-950
                          transition-colors duration-300 ease-in-out">
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Let's discuss how our team can help you achieve your goals.
            </p>
            <Link 
              to="/#contact" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium 
                        hover:bg-blue-700 transition duration-300 mt-10"
            >
              Get in Touch
            </Link>
          </div>
      </section>
    </div>
  );
}

export default ServicesPage;