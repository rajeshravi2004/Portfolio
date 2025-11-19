import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaPython, FaNodeJs, FaFileAlt, FaDatabase, FaCubes, FaFilePdf, FaFileWord, FaDesktop, FaShoppingCart, FaCreditCard, FaRobot, FaMicrophone } from 'react-icons/fa';
import { SiFastapi, SiGoogle, SiTailwindcss, SiYoutube, SiVite, SiDjango, SiStripe } from 'react-icons/si';

const Projects = () => {
  const projects = [
    {
      title: 'AI Assistant with Document Analysis',
      description: 'Professional AI chatbot powered by Google Gemini AI with document analysis capabilities.',
      longDescription: 'A comprehensive AI assistant application that supports both general conversation and document analysis modes. Built with FastAPI and modern web technologies, featuring document upload, vector search, and AI-powered Q&A functionality.',
      technologies: [
        { name: 'FastAPI', icon: <SiFastapi className="w-5 h-5" /> },
        { name: 'Google Gemini AI', icon: <SiGoogle className="w-5 h-5" /> },
        { name: 'Python', icon: <FaPython className="w-5 h-5" /> },
        { name: 'React', icon: <FaReact className="w-5 h-5" /> },
        { name: 'FAISS', icon: <FaDatabase className="w-5 h-5" /> },
        { name: 'LangChain', icon: <FaCubes className="w-5 h-5" /> }
      ],
      features: [
        'Dual-mode AI chat (General & Document Analysis)',
        'Document upload and processing (PDF, DOCX, TXT, CSV, XLSX)',
        'Vector-based document search using FAISS',
        'Session-based chat management',
        'Export chat functionality',
        'User authentication system',
        'Real-time document indexing',
        'Professional responsive UI'
      ],
      github: 'https://github.com/rajeshravi2004/Chatbot',
      demo: '#',
      status: 'Completed',
      period: '2024'
    },
    {
      title: 'Resume Builder',
      description: 'Full-stack resume builder application with template system and PDF/DOCX export capabilities.',
      longDescription: 'A comprehensive resume builder with client-server architecture. Features a builder interface for editing resume content, multiple template options with live previews, and export functionality to PDF and DOCX formats. Supports JSON import/export for easy data management.',
      technologies: [
        { name: 'React', icon: <FaReact className="w-5 h-5" /> },
        { name: 'Node.js', icon: <FaNodeJs className="w-5 h-5" /> },
        { name: 'JavaScript', icon: <FaFileAlt className="w-5 h-5" /> },
        { name: 'Puppeteer', icon: <FaFilePdf className="w-5 h-5" /> },
        { name: 'DOCX', icon: <FaFileWord className="w-5 h-5" /> }
      ],
      features: [
        'Interactive resume builder with real-time editing',
        'JSON export/import for resume data management',
        'Multiple built-in resume templates',
        'Custom HTML template support with placeholders',
        'Live template preview with actual data',
        'PDF export via Puppeteer',
        'DOCX export functionality',
        'Reset and clear all options',
        'Client-server architecture'
      ],
      github: 'https://github.com/rajeshravi2004/Resume-Builder',
      demo: '#',
      status: 'Completed',
      period: '2024'
    },
    {
      title: 'Rajify - Spotify-like Music Player',
      description: 'Desktop music player application with Spotify-like interface, built with React and Electron.',
      longDescription: 'A modern desktop music player application that mimics Spotify\'s interface. Built with React, Electron, and YouTube API. Features playlist management, shuffle, repeat modes, favorites, queue system, and cookie-based data storage. Available as both web app and Windows EXE.',
      technologies: [
        { name: 'React 19', icon: <FaReact className="w-5 h-5" /> },
        { name: 'Electron', icon: <FaDesktop className="w-5 h-5" /> },
        { name: 'Vite', icon: <SiVite className="w-5 h-5" /> },
        { name: 'YouTube API', icon: <SiYoutube className="w-5 h-5" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5" /> }
      ],
      features: [
        'Playlist management with YouTube integration',
        'Shuffle and repeat modes (off/all/one)',
        'Favorites system for saved tracks',
        'Queue management for playback control',
        'Cookie-based data storage',
        'Spotify-like dark-themed UI',
        'Desktop app (Windows EXE)',
        'Search playlists by language and genre',
        'Recently played playlists',
        'Library management'
      ],
      github: 'https://github.com/rajeshravi2004/RajAudios',
      demo: '#',
      status: 'Completed',
      period: '2024'
    },
    {
      title: 'Zoro\'s Shop - AI-Powered E-Commerce',
      description: 'Modern e-commerce platform with AI-powered assistant, built with Django and Google Gemini AI.',
      longDescription: 'A feature-rich e-commerce platform with intelligent AI assistance powered by Google Gemini. Features product catalog, smart shopping cart, secure Stripe payments, user authentication, and an AI chatbot with voice interaction capabilities. Includes site-wide knowledge base and context-aware responses.',
      technologies: [
        { name: 'Django 5.0+', icon: <SiDjango className="w-5 h-5" /> },
        { name: 'Google Gemini AI', icon: <SiGoogle className="w-5 h-5" /> },
        { name: 'Python', icon: <FaPython className="w-5 h-5" /> },
        { name: 'FAISS', icon: <FaDatabase className="w-5 h-5" /> },
        { name: 'Stripe', icon: <SiStripe className="w-5 h-5" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-5 h-5" /> }
      ],
      features: [
        'Product catalog with category filtering and search',
        'Smart shopping cart with real-time price calculation',
        'Secure Stripe-powered payment processing',
        'User authentication with order history tracking',
        'AI-powered chatbot with Google Gemini integration',
        'Voice interaction (text-to-speech & speech-to-text)',
        'Site-wide knowledge base for context-aware responses',
        'Document processing (PDF, DOCX, CSV, Excel)',
        'Vector similarity search with FAISS',
        'Responsive design with modern UI/UX'
      ],
      github: 'https://github.com/rajeshravi2004/zoroshop',
      demo: '#',
      status: 'Completed',
      period: '2024'
    }
  ];

  return (
    <section
      id="projects"
      className="pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-purple-50/30 to-slate-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Showcasing my recent work in AI-powered applications, fullstack development, desktop applications, and intelligent document analysis
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {project.period}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-base">
                  {project.longDescription}
                </p>

                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-slate-600 dark:text-slate-300 text-sm flex items-start">
                        <span className="text-purple-500 dark:text-purple-400 mr-2 mt-1.5 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-full text-sm border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-colors">
                        <span className="text-purple-600 dark:text-purple-400">{tech.icon}</span>
                        <span className="text-slate-800 dark:text-gray-100 font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all duration-200"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm">Code</span>
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-200"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/rajeshravi2004"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
