import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
        animate={{
          x: theme === 'light' ? 0 : 24,
          rotate: theme === 'light' ? 0 : 180,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <motion.div
          animate={{
            rotate: theme === 'light' ? 0 : -180,
            scale: theme === 'light' ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? (
            <FaSun className="w-4 h-4 text-yellow-500" />
          ) : (
            <FaMoon className="w-4 h-4 text-blue-600" />
          )}
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0"
        animate={{
          opacity: theme === 'light' ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
