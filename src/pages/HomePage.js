// src/pages/HomePage.js
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// NOTE: Assuming your components are correctly located in the '../components/' directory.
import Hero from '../components/Hero'; 
import Services from '../components/Services';
import WhyPartner from '../components/WhyPartner';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials'; 
// -------------------------


// --- Animation Variant for the Page Container ---
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    out: { opacity: 0, y: -20, transition: { duration: 0.5 } }
};


function HomePage() {

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
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