// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create the Provider (the "brain" component)
export function ThemeProvider({ children }) {
  console.log('ThemeContext: Provider is loaded!'); // 👈 DEBUG 1

  // Get theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // 3. This effect runs when 'theme' changes
  useEffect(() => {
    console.log('ThemeContext: useEffect ran. New theme is:', theme); // 👈 DEBUG 2
    const root = window.document.documentElement; // The <html> tag

    if (theme === 'dark') {
      console.log('ThemeContext: Adding "dark" class'); // 👈 DEBUG 3
      root.classList.add('dark');
    } else {
      console.log('ThemeContext: Removing "dark" class'); // 👈 DEBUG 4
      root.classList.remove('dark');
    }

    // 4. Save the user's choice in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 5. The function to change the theme
  const toggleTheme = () => {
    console.log('ThemeContext: toggleTheme CALLED!'); // 👈 DEBUG 5
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // 6. Provide the theme and the toggle function to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 7. Create a custom hook to easily use the context
export const useTheme = () => {
  return useContext(ThemeContext);
};