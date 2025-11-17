// src/components/Testimonials.js
import React from 'react';

const testimonialsData = [
  {
    quote: "Nexus Solutions transformed our infrastructure. Their DevOps team cut our deployment time by 60%. Highly recommend!",
    name: "Alex M.",
    title: "CTO, GlobalTech Corp"
  },
  {
    quote: "The custom software they built was flawless and perfectly aligned with our business goals. True innovators in the space.",
    name: "Sarah K.",
    title: "Director of Product, Beta Labs"
  },
  {
    quote: "Exceptional data science expertise. We gained actionable insights we didn't even know were possible. A vital partnership.",
    name: "David L.",
    title: "Head of R&D, Synapse Systems"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        
        {/* Subtitle */}
        <p className="text-sm uppercase tracking-widest text-blue-400 mb-2">Social Proof</p>
        
        {/* Title */}
        <h2 className="text-4xl font-bold mb-12">What Our Clients Say</h2>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
            >
              {/* Quote Icon */}
              <blockquote className="text-4xl text-blue-500 font-serif mb-4">“</blockquote>
              
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