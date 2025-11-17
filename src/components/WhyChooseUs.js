// src/components/WhyChooseUs.js
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// This is the original benefits array
const benefits = [
  {
    title: 'Proven Results',
    description: 'Our track record speaks for itself, with 95% client retention and measurable ROI.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  {
    title: 'Innovative Thinking',
    description: 'We go beyond the brief to deliver creative solutions that give you a competitive edge.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4.636 18.364l-.707.707M3 12H2m1.636-6.364l.707.707M12 21v-1m0-18a9 9 0 00-9 9h18a9 9 0 00-9-9z" /></svg>
    ),
  },
  {
    title: 'Dedicated Support',
    description: 'Your project gets a dedicated team, ensuring clear communication and support.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v4z" /></svg>
    ),
  },
];

// These are the original animation variants
const imageVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};
const contentVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};

function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    // 👇 ADDED dark: classes
    <section className="bg-blue-50 py-20 md:py-28
                      dark:bg-blue-950
                      transition-colors duration-300 ease-in-out">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          
          <motion.div 
            className="rounded-lg shadow-xl overflow-hidden"
            variants={imageVariants}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071" 
              alt="Our team collaborating"
              className="w-full h-96 object-cover" 
            />
          </motion.div>

          <motion.div 
            variants={contentVariants}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Why Partner with Nexus Solutions?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-blue-200">
              We don't just build software—we build partnerships. 
              Our focus is on delivering tangible results that drive your business forward.
            </p>

            <ul className="mt-10 space-y-6">
              {benefits.map((item) => (
                <li key={item.title} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full 
                                  bg-blue-600 text-white
                                  dark:bg-blue-500">
                      {item.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-gray-600 dark:text-blue-200">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;