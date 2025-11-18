// src/components/WhyPartner.js

import React from 'react';
import { motion } from 'framer-motion';
import partnerImage from '../assets/why-partner-image.jpg';
import { useTranslation } from '../contexts/LanguageContext';

const WhyPartner = () => {
    const { t } = useTranslation();

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
                        <img
                            src={partnerImage}
                            alt={t('whyPartner.imageAlt')}
                            className="h-80 w-full object-cover rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="md:w-1/2 text-white">
                        <h2 className="text-4xl font-bold mb-6">
                            {t('whyPartner.title')}
                        </h2>
                        <p className="text-gray-300 mb-8">
                            {t('whyPartner.subtitle')}
                        </p>

                        {/* Feature List */}
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-3 text-xl">🚀</span>
                                <div>
                                    <h4 className="font-semibold text-xl">
                                        {t('whyPartner.feature1.title')}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {t('whyPartner.feature1.description')}
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-3 text-xl">💡</span>
                                <div>
                                    <h4 className="font-semibold text-xl">
                                        {t('whyPartner.feature2.title')}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {t('whyPartner.feature2.description')}
                                    </p>
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