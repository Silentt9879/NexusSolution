// src/components/BlogCardSkeleton.js
import React from 'react';

// This component uses Tailwind's 'animate-pulse' utility
const BlogCardSkeleton = () => {
    return (
        <div 
            className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                       h-[300px] md:h-[350px]" // Set a fixed height matching your actual cards
        >
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="p-6">
                {/* Date Placeholder */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                
                {/* Title Line 1 Placeholder */}
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                
                {/* Title Line 2 Placeholder */}
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton;