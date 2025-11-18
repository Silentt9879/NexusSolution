// src/components/Contact.js
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

// Animation variants
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

function Contact() {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("YOUR_FORM_ID"); // Replace with your Formspree ID

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
                   dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950
                   py-20 md:py-28 min-h-screen flex items-center justify-center
                   transition-colors duration-300 ease-in-out relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success checkmark animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 mb-6
                     bg-green-100 dark:bg-green-900/30 rounded-full"
          >
            <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </svg>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('contact.successTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-blue-200 max-w-2xl mx-auto mb-8">
            {t('contact.successMessage')}
          </p>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/"
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg 
             rounded-full shadow-2xl hover:bg-gray-50 
             transition-all duration-300"
            >
              {t('contact.successButton')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50
                 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950
                 py-20 md:py-28 relative overflow-hidden
                 transition-colors duration-300 ease-in-out">

      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
            animate={{
              y: [-1000, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
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
              📧 {t('contact.badge')}
            </span>
          </motion.div>

          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-blue-200 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

          {/* Left side - Info */}
          <AnimatedSection variants={slideInLeftVariants}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('contact.leftTitle')}
                </h3>
                <p className="text-lg text-gray-600 dark:text-blue-200">
                  {t('contact.leftSubtitle')}
                </p>
              </div>

              {/* Contact info cards */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md
                           border border-blue-100 dark:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full
                                bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.emailLabel')}</p>
                    <p className="text-gray-900 dark:text-white font-semibold">contactnexussolutions@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md
                           border border-blue-100 dark:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full
                                bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.212l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.212-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.phoneLabel')}</p>
                    <p className="text-gray-900 dark:text-white font-semibold">+60 12 456-789</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md
                           border border-blue-100 dark:border-gray-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full
                                bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('contact.locationLabel')}</p>
                    <p className="text-gray-900 dark:text-white font-semibold">Chan Sow Lin</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right side - Form */}
          <AnimatedSection variants={slideInRightVariants}>
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl
                       border-2 border-blue-100 dark:border-gray-700 relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.formNameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200
                             dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
                             transition-all duration-300 outline-none"
                    placeholder={t('contact.formNamePlaceholder')}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.formEmailLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200
                             dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
                             transition-all duration-300 outline-none"
                    placeholder={t('contact.formEmailPlaceholder')}
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.formSubjectLabel')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200
                             dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
                             transition-all duration-300 outline-none"
                    placeholder={t('contact.formSubjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.formMessageLabel')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200
                             dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
                             transition-all duration-300 outline-none resize-none"
                    placeholder={t('contact.formMessagePlaceholder')}
                    required
                  ></textarea>
                  <ValidationError
                    errors={state.errors}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 border border-transparent shadow-lg
                           text-lg font-semibold rounded-xl text-white 
                           bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-700 hover:to-purple-700
                           focus:outline-none focus:ring-4 focus:ring-blue-500/50
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           disabled:hover:from-blue-600 disabled:hover:to-purple-600"
                >
                  {state.submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.formSubmitting')}
                    </span>
                  ) : (
                    t('contact.formSubmitButton')
                  )}
                </motion.button>
              </form>
            </motion.div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}

export default Contact;