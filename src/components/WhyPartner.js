// src/components/WhyPartner.js

import React from 'react';
import { motion } from 'framer-motion';
import partnerImage from '../assets/why-partner-image.jpg';

const WhyPartner = () => {
    return (
        <motion.section
            className="bg-gray-900 dark:bg-gray-900 py-20 md:py-28"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Image Area */}
                    <div className="md:w-1/2">
                        {/* Placeholder Image - Replace with your actual image later */}
                        <img
                            src={partnerImage} // 👈 2. USE THE IMPORTED VARIABLE HERE
                            alt="Diverse professionals collaborating at a meeting"
                            className="h-80 w-full object-cover rounded-lg shadow-xl" // Tailwind classes for styling
                        />
                    </div>

                    {/* Content Area */}
                    <div className="md:w-1/2 text-white">
                        <h2 className="text-4xl font-bold mb-6">
                            Why Partner with Nexus Solutions?
                        </h2>
                        <p className="text-gray-300 mb-8">
                            We deliver tangible results through deep expertise, transparent partnerships, and dedicated support.
                        </p>

                        {/* Example Feature List */}
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-3 text-xl">🚀</span>
                                <div>
                                    <h4 className="font-semibold text-xl">Proven Results</h4>
                                    <p className="text-gray-400 text-sm">Focused on performance with 95% client retention.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-3 text-xl">💡</span>
                                <div>
                                    <h4 className="font-semibold text-xl">Innovative Thinking</h4>
                                    <p className="text-gray-400 text-sm">We go beyond the brief to deliver creative solutions.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default WhyPartner;