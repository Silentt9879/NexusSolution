// src/pages/SinglePostPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../client';
import { motion } from 'framer-motion';

// --- Helper function to format the date ---
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// --- Main Component ---
function SinglePostPage() {
  // State for post, comments, loading, and errors
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the comment form
  const [formData, setFormData] = useState({ name: '', comment: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { slug } = useParams(); // 1. Get the "slug" from the URL

  // 2. Fetch the correct blog post
  useEffect(() => {
    const postQuery = `*[_type == "post" && slug.current == $slug][0]{
      _id, // We need the post ID to find its comments
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      body
    }`;

    setIsLoading(true); // Set loading state
    client.fetch(postQuery, { slug })
      .then((data) => {
        if (data) {
          setPostData(data);
          // We don't stop loading here; we wait for comments
        } else {
          setError(new Error('Post not found.'));
          setIsLoading(false); // Stop loading if post not found
        }
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setError(err);
        setIsLoading(false);
      });
  }, [slug]);

  // 3. Fetch the comments *after* the post data has been loaded
  useEffect(() => {
    if (postData) {
      const commentsQuery = `*[_type == "comment" && approved == true && post._ref == $postId]{
        _id,
        name,
        comment,
        _createdAt
      } | order(_createdAt asc)`;

      client.fetch(commentsQuery, { postId: postData._id })
        .then((data) => {
          setComments(data);
          setIsLoading(false); // Stop loading only after comments are fetched
        })
        .catch((err) => {
          console.error('Error fetching comments:', err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [postData]); // This effect depends on 'postData'

  // --- Handle Form Input Change ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- Handle Form Submission (Simulated) ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    setIsSubmitting(true);

    const submission = {
      name: formData.name,
      comment: formData.comment,
      post: postData._id, // This is the ID of the current post
    };

    try {
      // Send the data to our new server, not Sanity
      const response = await fetch('http://localhost:3001/api/submit-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // It worked!
      setIsSubmitting(false);
      setIsSubmitted(true); // Show the "Thank You" message
      setFormData({ name: '', comment: '' }); // Clear the form

    } catch (err) {
      console.error('Error submitting comment:', err);
      // We could add an error message to the user here
      setIsSubmitting(false);
    }
  };

  // --- Render States ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Loading Post...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
          Error: {error.message}
        </h1>
        <Link to="/blog" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  if (!postData) return null; // Should be covered, but good practice

  return (
    <motion.div
      className="bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{`Nexus Solutions | ${postData.title}`}</title>
        <meta name="description" content={`Read the blog post: ${postData.title}`} />
      </Helmet>
      
      {/* 1. Post Header with Image */}
      <div className="relative h-96">
        <img
          src={urlFor(postData.mainImage).width(1200).height(400).auto('format').fit('crop').url()}
          alt={postData.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white z-10">
            {postData.title}
          </h1>
          <p className="text-lg text-gray-200 z-10 mt-2">
            Published on {formatDate(postData.publishedAt)}
          </p>
        </div>
      </div>
      
      {/* 2. Post Body Content */}
      <div className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* The typography plugin styles this automatically */}
        <article className="prose prose-lg dark:prose-invert
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-a:text-blue-600 dark:prose-a:text-blue-400
                            prose-li:marker:text-blue-600 dark:prose-li:marker:text-blue-400
                            prose-blockquote:border-l-blue-600 dark:prose-blockquote:border-l-blue-400">
          <PortableText value={postData.body} />
        </article>
      </div>
      
      {/* 3. Comments Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Comments ({comments ? comments.length : 0})
          </h2>
          
          <div className="space-y-6">
            {/* If we have comments, map them out */}
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {comment.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                      {formatDate(comment._createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {comment.comment}
                  </p>
                </div>
              ))
            ) : (
              // If there are no comments
              <p className="text-gray-600 dark:text-gray-300">
                No comments yet. Be the first to leave one!
              </p>
            )}
            
            {/* 4. Leave a Comment Form */}
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Leave a Comment
              </h3>

              {/* Show "Thank You" message after submission */}
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 p-4 rounded-lg">
                  Thank you for your comment! It is awaiting moderation.
                </div>
              ) : (
                // Show the form
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                 focus:border-blue-500 focus:ring-blue-500
                                 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      id="comment"
                      rows="4"
                      value={formData.comment}
                      onChange={handleFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                 focus:border-blue-500 focus:ring-blue-500
                                 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                                 text-base font-medium rounded-lg text-white bg-blue-600
                                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                 transition duration-300
                                 disabled:bg-gray-400 dark:disabled:bg-gray-600"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Comment"}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default SinglePostPage;