// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; 
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client, urlFor } from '../client';

// --- ANIMATION VARIANTS & COMPONENTS ---
const fadeInVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7 } } };
const slideInLeftVariants = { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const slideInRightVariants = { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const cardContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

function AnimatedSection({ children, variants }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants}>
      {children}
    </motion.div>
  );
}

// --- MAIN PAGE COMPONENT ---
function AboutPage() {
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetches name, role, and the image reference for all team members
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
      return <p className="text-center text-lg text-gray-600 dark:text-gray-300">Loading team...</p>;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 dark:bg-red-950 rounded-lg">
          <p className="text-lg text-red-600 dark:text-red-200">
            Sorry, we couldn't load the team at this time.
          </p>
        </div>
      );
    }
    
    // Renders the team members in a grid
    return (
      <AnimatedSection variants={cardContainerVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team && team.map((member) => (
            <motion.div
              key={member.name}
              className="bg-white text-center rounded-lg shadow-xl overflow-hidden
                         dark:bg-gray-800 transition duration-300 hover:shadow-2xl"
              variants={fadeInVariants}
            >
              {/* Team Member Image */}
              <img 
                src={urlFor(member.image).width(400).height(400).url()} 
                alt={member.name} 
                className="w-full h-72 object-cover object-top" // Use object-top to keep faces visible
              />
              <div className="p-6">
                {/* Team Member Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                {/* Team Member Role */}
                <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    );
  };

  return (
    <div>
      <Helmet>
        <title>About Us | Nexus Solutions</title>
        <meta 
          name="description" 
          content="Meet the passionate team of developers, designers, and strategists at Nexus Solutions, dedicated to solving real-world problems." 
        />
      </Helmet>

      {/* 1. Hero Header Section */}
      <div className="bg-blue-50 py-20 text-center dark:bg-blue-950">
          <AnimatedSection variants={fadeInVariants}>
           <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
             About Nexus Solutions
           </h1>
           <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-blue-200 max-w-2xl mx-auto">
             We're a passionate team dedicated to building software
             that solves real-world problems.
           </p>
         </AnimatedSection>
      </div>

      {/* 2. Our Story Section */}
      <section className="bg-white py-20 md:py-28 dark:bg-gray-900">
         <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection variants={slideInLeftVariants}>
              <div className="rounded-lg shadow-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070" alt="Our office" className="w-full h-96 object-cover" />
              </div>
            </AnimatedSection>
            <AnimatedSection variants={slideInRightVariants}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Our Story
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Founded in 2020, Nexus Solutions began with a simple idea: to
                make powerful technology accessible and simple for businesses of all sizes.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                We saw too many companies struggling with outdated, inefficient
                systems. We knew there was a better way. Today, we're a thriving team
                of developers, designers, and strategists who are passionate about
                building cutting-edge solutions that drive real growth and innovation.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Meet the Team Section (Now dynamic) */}
      <section className="bg-gray-50 py-20 md:py-28 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              The dedicated minds behind our innovation.
            </p>
          </div>
          {/* This renders the fetched team data */}
          {renderTeamContent()}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;