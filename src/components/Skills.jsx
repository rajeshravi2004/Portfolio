import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaCode,
  FaRobot,
  FaHtml5,
  FaCss3,
  FaJsSquare,
  FaGitAlt
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiSelenium,
  SiFlask,
  SiDjango
} from 'react-icons/si';

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FaCode className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', icon: <FaReact className="w-6 h-6" />, level: 90 },
        { name: 'JavaScript', icon: <FaJsSquare className="w-6 h-6" />, level: 85 },
        { name: 'HTML5', icon: <FaHtml5 className="w-6 h-6" />, level: 95 },
        { name: 'CSS3', icon: <FaCss3 className="w-6 h-6" />, level: 90 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6" />, level: 85 },
      ]
    },
    {
      title: 'Backend Development',
      icon: <FaNodeJs className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6" />, level: 85 },
        { name: 'Express.js', icon: <SiExpress className="w-6 h-6" />, level: 80 },
        { name: 'Python', icon: <FaPython className="w-6 h-6" />, level: 90 },
        { name: 'Django', icon: <SiDjango className="w-6 h-6" />, level: 75 },
        { name: 'Flask', icon: <SiFlask className="w-6 h-6" />, level: 80 },
      ]
    },
    {
      title: 'Database & Cloud',
      icon: <FaDatabase className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'MySQL', icon: <FaDatabase className="w-6 h-6" />, level: 85 },
        { name: 'MongoDB', icon: <SiMongodb className="w-6 h-6" />, level: 80 },
        { name: 'Oracle', icon: <FaDatabase className="w-6 h-6" />, level: 75 },
        { name: 'REST APIs', icon: <FaCode className="w-6 h-6" />, level: 85 },
      ]
    },
    {
      title: 'Automation & Tools',
      icon: <FaRobot className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Selenium', icon: <SiSelenium className="w-6 h-6" />, level: 80 },
        { name: 'Playwright', icon: <FaRobot className="w-6 h-6" />, level: 85 },
        { name: 'Web Scraping', icon: <FaRobot className="w-6 h-6" />, level: 90 },
        { name: 'Puppeteer', icon: <FaRobot className="w-6 h-6" />, level: 75 },
        { name: 'Git', icon: <FaGitAlt className="w-6 h-6" />, level: 85 },
      ]
    }
  ];

  return (
    <section
      id="skills"
      className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-pink-400/20 dark:from-cyan-500/10 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive showcase of my technical expertise across multiple domains
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expertise Level: Advanced</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (categoryIndex * 0.1) + (skillIndex * 0.05)
                    }}
                    viewport={{ once: true }}
                    className="bg-white/40 dark:bg-gray-700/40 p-4 rounded-2xl shadow-inner"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}>
                        {skill.icon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Additional Technologies & Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'OpenAPI.yaml', gradient: 'from-blue-500 to-cyan-500', icon: '📋' },
              { name: 'Chatbot Development', gradient: 'from-purple-500 to-pink-500', icon: '🤖' },
              { name: 'PDF Generation', gradient: 'from-green-500 to-emerald-500', icon: '📄' },
              { name: 'API Documentation', gradient: 'from-orange-500 to-red-500', icon: '📚' },
              { name: 'Agile Development', gradient: 'from-indigo-500 to-purple-500', icon: '⚡' },
              { name: 'Problem Solving', gradient: 'from-teal-500 to-cyan-500', icon: '🧩' },
              { name: 'Team Collaboration', gradient: 'from-pink-500 to-rose-500', icon: '🤝' },
              { name: 'Time Management', gradient: 'from-violet-500 to-purple-500', icon: '⏰' }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                className={`p-5 rounded-2xl shadow-lg bg-gradient-to-br ${skill.gradient} text-white font-semibold hover:scale-105 transform transition`}
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <p className="text-sm">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
