// src/components/ProcessSteps.js
import React, { useState, useEffect } from 'react';
import { client } from '../client';
import { useTranslation } from '../contexts/LanguageContext';

const ProcessSteps = ({ serviceSlug }) => {
  const { language } = useTranslation();
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch process steps from Sanity based on serviceSlug
    const query = `*[_type == "processStep" && service->slug.current == $serviceSlug] | order(stepNumber asc) {
      stepNumber,
      title,
      title_ms,
      description,
      description_ms
    }`;

    client.fetch(query, { serviceSlug })
      .then((data) => {
        setSteps(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching process steps:', err);
        setIsLoading(false);
      });
  }, [serviceSlug]);

  if (isLoading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;
  }

  if (!steps || steps.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No process steps available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      {steps.map((item) => (
        <div 
          key={item.stepNumber} 
          className="p-5 border border-blue-500 rounded-lg bg-blue-900/10 dark:bg-gray-800/50"
        >
          <span className="text-3xl font-extrabold text-blue-500 block mb-2">
            {item.stepNumber}.
          </span>
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {language === 'ms' && item.title_ms ? item.title_ms : item.title}
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'ms' && item.description_ms ? item.description_ms : item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;