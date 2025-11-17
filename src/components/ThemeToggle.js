// src/components/ThemeToggle.js
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // 1. Import our hook

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // 2. Get the current theme and the toggle function

  return (
    <button
      onClick={toggleTheme} // 3. Call the toggle function on click
      className="p-2 rounded-full text-gray-600 hover:bg-gray-100
                 dark:text-gray-300 dark:hover:bg-gray-700
                 focus:outline-none transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {/* 4. Show the correct icon based on the current theme */}
      {theme === 'light' ? (
        // Moon Icon (shown when in light mode)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 008.25-4.5z"
          />
        </svg>
      ) : (
        // 👇 UPDATED Sun Icon (shown when in dark mode)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32" // Changed viewBox
          fill="currentColor" // Changed to fill
          className="w-6 h-6" // Kept the size
        >
          {/* Your new path */}
          <path
            d="M 15 3 L 15 8 L 17 8 L 17 3 Z M 7.5 6.09375 L 6.09375 7.5 L 9.625 11.0625 L 11.0625 9.625 Z M 24.5 6.09375 L 20.9375 9.625 L 22.375 11.0625 L 25.90625 7.5 Z M 16 9 C 12.144531 9 9 12.144531 9 16 C 9 19.855469 12.144531 23 16 23 C 19.855469 23 23 19.855469 23 16 C 23 12.144531 19.855469 9 16 9 Z M 16 11 C 18.773438 11 21 13.226563 21 16 C 21 18.773438 18.773438 21 16 21 C 13.226563 21 11 18.773438 11 16 C 11 13.226563 13.226563 11 16 11 Z M 3 15 L 3 17 L 8 17 L 8 15 Z M 24 15 L 24 17 L 29 17 L 29 15 Z M 9.625 20.9375 L 6.09375 24.5 L 7.5 25.90625 L 11.0625 22.375 Z M 22.375 20.9375 L 20.9375 22.375 L 24.5 25.90625 L 25.90625 24.5 Z M 15 24 L 15 29 L 17 29 L 17 24 Z"
          />
        </svg>
      )}
    </button>
  );
}