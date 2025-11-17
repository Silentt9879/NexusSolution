// src/components/ProcessSteps.js
import React from 'react';

// Hardcoded data based on the service slugs defined in your iconMap
const allServiceProcesses = {
    'custom-software-development': [
        { step: 1, title: 'Discovery & Planning', description: 'Define requirements, scope, and technical stack.' },
        { step: 2, title: 'Design & Prototyping', description: 'Create user interfaces (UI/UX) and architecture design.' },
        { step: 3, title: 'Agile Development', description: 'Develop in iterative sprints with continuous feedback.' },
        { step: 4, title: 'Quality Assurance & Testing', description: 'Thoroughly test performance, security, and functionality.' },
        { step: 5, title: 'Deployment & Launch', description: 'Deploy to production environment and monitor performance.' },
    ],
    'cloud-devops-infrastructure': [
        { step: 1, title: 'Assessment & Strategy', description: 'Audit existing infrastructure and define migration/automation goals.' },
        { step: 2, title: 'Architecture Design', description: 'Design scalable, cost-optimized cloud and CI/CD pipelines.' },
        { step: 3, title: 'Automation Implementation', description: 'Implement Infrastructure-as-Code (IaC) and pipeline scripts.' },
        { step: 4, title: 'Monitoring & Optimization', description: 'Set up real-time monitoring and fine-tune resources.' },
    ],
    'data-science-ai': [
        { step: 1, title: 'Data Acquisition & Cleansing', description: 'Collect, validate, and prepare raw data for analysis.' },
        { step: 2, title: 'Model Development', description: 'Develop, train, and test custom machine learning models.' },
        { step: 3, title: 'Integration & Deployment', description: 'Integrate the model into the client’s existing application layer.' },
        { step: 4, title: 'Performance Monitoring', description: 'Track model accuracy and retrain as needed for continuous improvement.' },
    ],
};


const ProcessSteps = ({ serviceSlug }) => {
    const process = allServiceProcesses[serviceSlug] || [];
    
    // A simple container to make the process look visually distinct
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {process.map((item) => (
                <div 
                    key={item.step} 
                    className="p-5 border border-blue-500 rounded-lg bg-blue-900/10 dark:bg-gray-800/50"
                >
                    <span className="text-3xl font-extrabold text-blue-500 block mb-2">
                        {item.step}.
                    </span>
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProcessSteps;