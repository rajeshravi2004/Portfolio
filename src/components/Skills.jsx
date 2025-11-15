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
      color: 'from-indigo-600 to-blue-700',
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
      color: 'from-emerald-600 to-teal-600',
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
      color: 'from-violet-600 to-indigo-600',
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
      color: 'from-slate-600 to-gray-700',
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
      className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 dark:from-black/70 dark:via-black/40 dark:to-black/70 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 text-slate-900 dark:text-white">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-slate-200 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-slate-700 dark:text-gray-200 max-w-3xl mx-auto">
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
              className="relative bg-white dark:bg-gray-900/40 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all overflow-hidden border border-slate-200/70 dark:border-white/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-300">Expertise Level: Advanced</p>
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
                      className="bg-slate-50 dark:bg-gray-800/60 p-4 rounded-2xl shadow-inner"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}>
                        {skill.icon}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-gray-100">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700/60 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-300">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
