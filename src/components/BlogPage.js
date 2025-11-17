// src/pages/BlogPage.js (REVISED with Skeleton Loader)
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion } from 'framer-motion';
import BlogCardSkeleton from '../components/BlogCardSkeleton'; // 👈 NEW IMPORT

// --- Animation Variants (No change) ---
const fadeInVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
};
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// --- Main Blog Page Component ---
function BlogPage() {
  const [allPosts, setAllPosts] = useState(null); 
  const [filteredPosts, setFilteredPosts] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); // Initial state is true
  const [error, setError] = useState(null);

  // 1. Fetch Posts
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
        setFilteredPosts(data); 
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError(err);
        setIsLoading(false);
      });
  }, []); 

  // 2. Handle Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!allPosts) return;

      if (searchTerm === "") {
        setFilteredPosts(allPosts);
      } else {
        const filtered = allPosts.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, allPosts]);

  // Helper function to format the date (No change)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // --- Helper function to render the post grid ---
  const renderBlogContent = () => {
    
    // --- NEW: Render Skeletons if loading ---
    if (isLoading) {
        // Render 6 skeleton cards while waiting for data
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                    <BlogCardSkeleton key={index} />
                ))}
            </div>
        );
    }
    
    // --- Render Error State (No change) ---
    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 dark:bg-red-950 rounded-lg">
          <p className="text-lg text-red-600 dark:text-red-200">
            Sorry, we couldn't load the blog at this time.
          </p>
        </div>
      );
    }

    // --- Render No Results State (No change) ---
    if (filteredPosts && filteredPosts.length === 0) {
      return (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          No posts found matching "{searchTerm}".
        </p>
      );
    }
    
    // --- Render Actual Posts (No change) ---
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPosts && filteredPosts.map((post) => (
          <motion.div key={post.slug} variants={fadeInVariants}>
            <Link to={`/blog/${post.slug}`} className="block group">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                            transition-all duration-300 ease-in-out
                            group-hover:shadow-xl group-hover:-translate-y-2">
                <img 
                  src={urlFor(post.mainImage).width(500).height(300).url()} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Blog | Nexus Solutions</title>
        <meta 
          name="description" 
          content="Explore the latest trends in digital transformation from the Nexus Solutions team." 
        />
      </Helmet>

      {/* 1. Hero Header Section (No change) */}
      <motion.div 
        className="bg-blue-50 py-20 text-center 
                   dark:bg-blue-950
                   transition-colors duration-300 ease-in-out"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
          Our Blog
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-blue-200 max-w-2xl mx-auto">
          Insights on technology, development, and digital transformation.
        </p>
      </motion.div>

      {/* 2. Blog Grid Section */}
      <section className="bg-gray-50 py-20 md:py-28 
                        dark:bg-gray-900
                        transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-6">
          
          {/* Search Bar (No change) */}
          <div className="mb-12 max-w-lg mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-4 py-3 rounded-lg shadow-sm
                         border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white
                         dark:focus:ring-blue-400
                         transition-colors duration-200"
            />
          </div>
          
          {renderBlogContent()}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;