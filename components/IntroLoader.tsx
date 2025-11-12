'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = () => {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const introShown = sessionStorage.getItem('introShown');
      return !introShown;
    }
    return true;
  });

  useEffect(() => {
    if (!isLoading) return;

    // Use pure CSS/Framer Motion instead of Anime.js for better compatibility
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('introShown', 'true');
    }, 3500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -1000,
            transition: { duration: 1, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        >
          {/* Animated Background Circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
          
          {/* Name Animation - Using Framer Motion instead of Anime.js */}
          <div className="intro-text text-6xl md:text-8xl font-bold text-center">
            {/* First Name */}
            <div>
              {'ASHITH'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1], // easeOutExpo
                  }}
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #00BCD4, #0097A7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            {/* Last Name */}
            <div>
              {'FERNANDES'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-white"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Loading Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '300px' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute bottom-20 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
