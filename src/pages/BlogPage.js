// src/pages/BlogPage.js

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';

// --- ENHANCED ANIMATION VARIANTS ---
const fadeInVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
};

const slideInLeftVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRightVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInUpVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
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

// --- NO RESULTS STATE COMPONENT ---
function NoResultsState({ searchTerm, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="max-w-2xl mx-auto px-6">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 
                      dark:from-blue-900/30 dark:to-purple-900/30 rounded-full 
                      flex items-center justify-center shadow-xl"
          >
            <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" 
                 stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              No articles found
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We couldn't find any articles matching <br />
              <span className="font-bold text-blue-600 dark:text-blue-400">
                "{searchTerm}"
              </span>
            </p>
          </div>

          {/* Suggestions Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 
                      dark:from-blue-900/20 dark:to-purple-900/20 
                      rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800
                      shadow-lg"
          >
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <div className="text-left">
                <p className="font-bold text-gray-900 dark:text-white mb-3">
                  Here are some tips to improve your search:
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    Try different or more general keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    Double-check your spelling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    Use fewer or simpler words
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    Remove quotes or special characters
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClear}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white font-bold rounded-full shadow-lg
                       hover:shadow-xl transition-all duration-300"
            >
              ← Clear Search & Browse All
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- FEATURED ARTICLE SECTION ---
function FeaturedArticle({ post }) {
  const { t } = useTranslation();

  if (!post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Featured Image */}
          <AnimatedSection variants={slideInLeftVariants}>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 
                            rounded-2xl blur opacity-25 group-hover:opacity-75 
                            transition duration-500" />
              
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src={urlFor(post.mainImage).width(600).height(400).url()} 
                  alt={post.title}
                  className="w-full h-96 object-cover transform group-hover:scale-105 
                           transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Featured Content */}
          <AnimatedSection variants={slideInRightVariants}>
            <div className="space-y-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8 }}
                className="h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              />
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full 
                               bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                               text-sm font-semibold">
                  {t('blog.featured.badge')}
                </span>
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                {post.title}
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('blog.featured.publishedOn')} <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {formatDate(post.publishedAt)}
                </span>
              </p>

              <Link 
                to={`/blog/${post.slug}`}
                className="inline-block"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                           text-white font-bold text-lg rounded-full shadow-xl 
                           hover:shadow-2xl transition-all duration-300"
                >
                  {t('blog.featured.readButton')}
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// --- MAIN BLOG PAGE COMPONENT ---
function BlogPage() {
  const { t } = useTranslation();
  const [allPosts, setAllPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Define stats data here to use translation
  const statsData = [
    { label: t('blog.stats.totalArticles'), value: 50, suffix: "+" },
    { label: t('blog.stats.monthlyReaders'), value: 10, suffix: "K+" },
    { label: t('blog.stats.topicsCovered'), value: 20, suffix: "+" },
    { label: t('blog.stats.expertAuthors'), value: 15, suffix: "+" }
  ];

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      mainImage,
      publishedAt
    }`;
    
    client.fetch(query)
      .then((data) => {
        setAllPosts(data);
        setFilteredPosts(data.slice(1)); // Exclude first post (featured)
        setFeaturedPost(data[0]); // Set first post as featured
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!allPosts) return;

      if (searchTerm === "") {
        setFilteredPosts(allPosts.slice(1));
      } else {
        const filtered = allPosts
          .filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(1);
        setFilteredPosts(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, allPosts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderBlogContent = () => {
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
            {t('blog.error')}
          </p>
        </motion.div>
      );
    }
    
    // IMPROVED NO RESULTS STATE
    if (filteredPosts && filteredPosts.length === 0) {
      return <NoResultsState searchTerm={searchTerm} onClear={() => setSearchTerm("")} />;
    }
    
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {filteredPosts && filteredPosts.map((post) => (
          <motion.div key={post.slug} variants={cardVariants}>
            <Link to={`/blog/${post.slug}`} className="block group">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden
                           border-2 border-gray-100 dark:border-gray-700
                           hover:border-blue-500 dark:hover:border-blue-400
                           hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
                           transition-all duration-300 h-full"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Image with overlay effect */}
                <div className="relative overflow-hidden h-56">
                  <motion.img 
                    src={urlFor(post.mainImage).width(500).height(300).url()} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center
                             opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full shadow-xl">
                      {t('blog.grid.readMore')}
                    </div>
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.publishedAt)}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white 
                                group-hover:text-blue-600 dark:group-hover:text-blue-400
                                transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      <Helmet>
        <title>{t('blog.title')} | Nexus Solutions</title>
        <meta 
          name="description" 
          content={t('blog.subtitle')}
        />
      </Helmet>

      {/* Hero Header Section */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                   dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 
                   py-20 md:py-32 text-center overflow-hidden"
      >
        <FloatingParticles />
        
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full 
                             bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                             text-blue-600 dark:text-blue-400 
                             text-sm font-semibold shadow-lg border-2 border-blue-200 dark:border-blue-800">
                {t('blog.hero.badge')}
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold mb-4 pb-3
                         bg-clip-text text-transparent bg-gradient-to-r 
                         from-blue-600 via-purple-600 to-pink-600
                         dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
            >
              {t('blog.title')}
            </motion.h1>
            
            <motion.p 
              className="mt-2 text-lg md:text-xl text-gray-700 dark:text-gray-200 
                         max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t('blog.subtitle')}
            </motion.p>
            
            <motion.div
              className="mt-8"
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

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={cardContainerVariants}
          >
            {statsData.map((stat) => (
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

      {/* Featured Article Section */}
      {featuredPost && <FeaturedArticle post={featuredPost} />}

      {/* Blog Grid Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white 
                          dark:from-gray-800 dark:to-gray-900 
                          py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Search Bar */}
          <AnimatedSection variants={slideInUpVariants}>
            <div className="mb-16 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 
                              text-gray-400 dark:text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <motion.input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('blog.searchPlaceholder')}
                  className="w-full pl-14 pr-4 py-4 rounded-2xl shadow-lg
                           border-2 border-gray-200 dark:border-gray-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           dark:bg-gray-800 dark:text-white
                           dark:focus:ring-blue-400
                           transition-all duration-300
                           text-lg"
                  whileFocus={{ scale: 1.02 }}
                />
                
                {/* Clear button */}
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0, y: "-50%" }}
    animate={{ scale: 1, y: "-50%" }}
    exit={{ scale: 0, y: "-50%" }}
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2
             w-10 h-10 flex items-center justify-center
             bg-gray-200 dark:bg-gray-700 rounded-full
             hover:bg-gray-300 dark:hover:bg-gray-600
             transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </div>
              
              {/* Search results count */}
              {filteredPosts && !isLoading && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-gray-600 dark:text-gray-400"
                >
                  {filteredPosts.length} {filteredPosts.length === 1 ? t('blog.search.article') : t('blog.search.articles')} {t('blog.search.found')}
                </motion.p>
              )}
            </div>
          </AnimatedSection>

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
                {t('blog.latest.badge')}
              </span>
            </motion.div>
            
            <AnimatedSection variants={fadeInVariants}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {t('blog.latest.title')}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('blog.latest.subtitle')}
              </p>
            </AnimatedSection>
          </div>
          
          {/* Blog Grid */}
          {renderBlogContent()}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;