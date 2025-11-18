// src/components/Testimonials.js
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonialsData = [
    {
      quote: t('testimonials.testimonial1.quote'),
      name: t('testimonials.testimonial1.name'),
      title: t('testimonials.testimonial1.title')
    },
    {
      quote: t('testimonials.testimonial2.quote'),
      name: t('testimonials.testimonial2.name'),
      title: t('testimonials.testimonial2.title')
    },
    {
      quote: t('testimonials.testimonial3.quote'),
      name: t('testimonials.testimonial3.name'),
      title: t('testimonials.testimonial3.title')
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        
        {/* Subtitle */}
        <p className="text-sm uppercase tracking-widest text-blue-400 mb-2">
          {t('testimonials.badge')}
        </p>
        
        {/* Title */}
        <h2 className="text-4xl font-bold mb-12">
          {t('testimonials.title')}
        </h2>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
            >
              {/* Quote Icon */}
              <blockquote className="text-4xl text-blue-500 font-serif mb-4">"</blockquote>
              
              {/* Quote */}
              <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
              
              {/* Name & Title */}
              <div className="text-left border-l-4 border-blue-500 pl-4">
                <p className="font-semibold text-xl">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;