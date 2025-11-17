// src/pages/BlogPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion } from 'framer-motion';

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
  // 👇 1. WE UPDATE OUR STATE
  const [allPosts, setAllPosts] = useState(null); // Holds all posts from Sanity
  const [filteredPosts, setFilteredPosts] = useState(null); // Holds posts to display
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search input text
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 2. THIS EFFECT FETCHES ALL POSTS (RUNS ONCE)
  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      mainImage,
      publishedAt
    }`;
    
    client.fetch(query)
      .then((data) => {
        setAllPosts(data); // Set the master list
        setFilteredPosts(data); // Set the display list
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError(err);
        setIsLoading(false);
      });
  }, []); // Empty array, so it only runs once

  // 👇 3. THIS NEW EFFECT HANDLES THE DEBOUNCED SEARCH
  useEffect(() => {
    // Set a timer for 300ms after the user stops typing
    const timer = setTimeout(() => {
      if (!allPosts) return; // Don't run if posts haven't loaded yet

      if (searchTerm === "") {
        // If search is empty, show all posts
        setFilteredPosts(allPosts);
      } else {
        // Otherwise, filter the master list
        const filtered = allPosts.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    }, 300); // 300ms debounce

    // Cleanup: If the user types again, clear the old timer
    return () => clearTimeout(timer);
  }, [searchTerm, allPosts]); // Re-run this effect when searchTerm or allPosts changes

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
    if (isLoading) {
      return <p className="text-center text-lg text-gray-600 dark:text-gray-300">Loading posts...</p>;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 dark:bg-red-950 rounded-lg">
          <p className="text-lg text-red-600 dark:text-red-200">
            Sorry, we couldn't load the blog at this time.
          </p>
        </div>
      );
    }
    // 👇 4. A NEW MESSAGE FOR "NO RESULTS"
    if (filteredPosts && filteredPosts.length === 0) {
      return (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          No posts found matching "{searchTerm}".
        </p>
      );
    }
    return (
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 👇 5. WE NOW MAP OVER 'filteredPosts' INSTEAD OF 'posts' */}
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
          
          {/* 👇 6. THIS IS THE NEW SEARCH BAR */}
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