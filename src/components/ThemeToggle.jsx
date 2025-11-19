import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-9 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-0 dark:opacity-100"
        animate={{
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />
      
      <motion.div
        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10"
        animate={{
          x: theme === 'light' ? 0 : 28,
          rotate: theme === 'light' ? 0 : 360,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <FaSun className="w-4 h-4 text-yellow-500" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <motion.div
                animate={{
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaMoon className="w-4 h-4 text-indigo-700" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: theme === 'light' 
            ? '0 0 20px rgba(251, 191, 36, 0.5)' 
            : '0 0 20px rgba(139, 92, 246, 0.5)',
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
