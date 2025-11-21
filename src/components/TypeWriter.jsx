import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * TypeWriter Component
 * Animates text as if it's being typed out
 * @param {string} text - The text to display
 * @param {number} speed - Speed of typing in ms per character (default: 50)
 * @param {boolean} showCursor - Show blinking cursor (default: true)
 * @param {string} className - Additional CSS classes
 */
function TypeWriter({ text, speed = 50, showCursor = true, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return (
    <div className={className}>
      <span>{displayedText}</span>
      {!isComplete && showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-1 h-full ml-1 bg-current"
        />
      )}
      {isComplete && showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-1 h-full ml-1 bg-current"
        />
      )}
    </div>
  );
}

export default TypeWriter;