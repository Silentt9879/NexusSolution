// src/pages/HomePage.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HashLink } from 'react-router-hash-link';

// Import your existing components
import Hero from '../components/Hero'; 
import Services from '../components/Services';
import WhyPartner from '../components/WhyPartner';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';

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

// --- ENHANCED HERO WRAPPER ---
function EnhancedHeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="relative overflow-hidden"
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
      
      {/* Your existing Hero component */}
      <div className="relative z-10">
        <Hero />
      </div>
    </motion.div>
  );
}

// --- STATS SECTION ---
function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [counts, setCounts] = React.useState({
    experience: 0,
    projects: 0,
    clients: 0,
    satisfaction: 0
  });

  React.useEffect(() => {
    if (!inView) return;
    
    const targets = {
      experience: 5,
      projects: 150,
      clients: 100,
      satisfaction: 98
    };
    
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      setCounts({
        experience: Math.floor(progress * targets.experience),
        projects: Math.floor(progress * targets.projects),
        clients: Math.floor(progress * targets.clients),
        satisfaction: Math.floor(progress * targets.satisfaction)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView]);

  const stats = [
    { label: "Years Experience", value: counts.experience, suffix: "+" },
    { label: "Projects Completed", value: counts.projects, suffix: "+" },
    { label: "Happy Clients", value: counts.clients, suffix: "+" },
    { label: "Client Satisfaction", value: counts.satisfaction, suffix: "%" }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 relative overflow-hidden">
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
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardContainerVariants}
        >
          {stats.map((stat, index) => (
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
                {stat.value}{stat.suffix}
              </motion.div>
              <p className="text-blue-100 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- ENHANCED SERVICES WRAPPER ---
function EnhancedServicesSection() {
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
              💼 What We Offer
            </span>
          </motion.div>
          
          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive solutions to accelerate your digital transformation.
            </p>
          </AnimatedSection>
        </div>

        {/* Your existing Services component */}
        <Services />
      </div>
    </section>
  );
}

// --- ENHANCED WHY PARTNER WRAPPER ---
function EnhancedWhyPartnerSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
                       dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 
                       py-20 md:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
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
                           bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 
                           text-sm font-semibold">
              🌟 Why Choose Us
            </span>
          </motion.div>
          
          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Why Partner with Nexus?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the difference of working with a team that truly cares.
            </p>
          </AnimatedSection>
        </div>

        {/* Your existing WhyPartner component */}
        <WhyPartner />
      </div>
    </section>
  );
}

// --- ENHANCED TESTIMONIALS WRAPPER ---
function EnhancedTestimonialsSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
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
              💬 Client Voices
            </span>
          </motion.div>
          
          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from those who've experienced our excellence.
            </p>
          </AnimatedSection>
        </div>

        {/* Your existing Testimonials component */}
        <Testimonials />
      </div>
    </section>
  );
}

function EnhancedContactSection() {
  return (
    <section id="contact" className="bg-gradient-to-b from-gray-50 to-white 
                          dark:from-gray-800 dark:to-gray-900 
                          py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
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
              📧 Get In Touch
            </span>
          </motion.div>
          
          <AnimatedSection variants={fadeInVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Let's Start a Conversation
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to transform your business? We're here to help.
            </p>
          </AnimatedSection>
        </div>

        {/* Your existing Contact component */}
        <Contact />
      </div>
    </section>
  );
}

// --- CTA SECTION ---
function CTASection() {
  return (
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who've accelerated their digital transformation with us.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <HashLink
              smooth
              to="#contact"
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg 
                       rounded-full shadow-2xl hover:bg-gray-50 
                       transition-all duration-300"
            >
              Get Started Today
            </HashLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- MAIN HOMEPAGE COMPONENT ---
function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <Helmet>
        <title>Nexus Solutions | Accelerate Digital Transformation</title>
        <meta 
          name="description" 
          content="Build cutting-edge software solutions for growth and efficiency with Nexus Solutions. We specialize in Cloud, DevOps, Custom Software, and Data & AI." 
        />
      </Helmet>
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Services / What We Do Section */}
      <Services />
      
      {/* 3. Why Partner with Nexus Solutions? Section */}
      <WhyPartner />
      
      {/* ⭐️ 4. TESTIMONIALS SECTION (NEWLY ADDED) ⭐️ */}
      <Testimonials />
      
      {/* 5. Get In Touch (Contact) Section */}
      <Contact />
    </motion.div>
  );
}

export default HomePage;