import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * TypeWriter Component - Infinite Loop Version
 * Types text -> Pauses -> Deletes text -> Repeats
 */
function TypeWriter({ 
  text, 
  speed = 100,      // Speed of typing
  deleteSpeed = 50, // Speed of backspacing (usually faster)
  delay = 2000,     // How long to wait after finishing before deleting
  className = "" 
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    // CASE 1: Typing forward
    if (!isDeleting && displayedText.length < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } 
    // CASE 2: Finished typing, wait before deleting
    else if (!isDeleting && displayedText.length === text.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } 
    // CASE 3: Deleting (Backspacing)
    else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, deleteSpeed);
    } 
    // CASE 4: Finished deleting, start over
    else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, speed, deleteSpeed, delay]);

  return (
    <div className={className}>
      <span>{displayedText}</span>
      {/* Cursor Blinking Animation */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-[1em] ml-1 bg-current align-middle"
      />
    </div>
  );
}

export default TypeWriter;