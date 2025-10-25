import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaPython, FaNodeJs, FaRobot, FaFileAlt, FaSearch, FaDatabase, FaBrain, FaCubes } from 'react-icons/fa';
import { SiFastapi, SiGoogle, SiTailwindcss } from 'react-icons/si';

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
    }
  ];

  return (
    <section id="projects" className="pt-12 sm:pt-16 lg:pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Showcasing my recent work in AI-powered applications, fullstack development, and intelligent document analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium">
                      {project.period}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 text-sm flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        <span className="text-blue-600">{tech.icon}</span>
                        <span className="text-gray-800">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm">Code</span>
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/rajeshravi2004/Chatbot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FaGithub className="w-5 h-5" />
            View Project on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
