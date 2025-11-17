// src/components/CTA.js
import React from 'react';

function CTA() {
  return (
    <section className="bg-gray-900">
      <div className="container mx-auto px-6 py-20 text-center">
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Ready to Start Your Transformation?
        </h2>
        
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Let's talk about your project. We're here to help you achieve 
          your goals and turn your ideas into reality.
        </p>
        
        <a 
          href="#" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium 
                     hover:bg-blue-700 transition duration-300 mt-10"
        >
          Get a Free Consultation
        </a>
        
      </div>
    </section>
  );
}

export default CTA;