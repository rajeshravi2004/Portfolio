import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaRocket, FaTrophy, FaUniversity, FaAward } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      number: '8.45',
      label: 'CGPA',
      description: 'BE Information Technology',
      icon: <FaGraduationCap className="w-7 h-7" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30'
    },
    {
      number: '4+',
      label: 'Technologies',
      description: 'Programming Languages',
      icon: <FaCode className="w-7 h-7" />,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30'
    },
    {
      number: '5+',
      label: 'Frameworks',
      description: 'Web Development',
      icon: <FaRocket className="w-7 h-7" />,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30'
    },
    {
      number: '2+',
      label: 'Internships',
      description: 'Industry Experience',
      icon: <FaTrophy className="w-7 h-7" />,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30'
    }
  ];

  const education = [
    {
      degree: 'BE in Information Technology',
      institution: 'Annamalai University',
      period: '2021–2025',
      score: 'CGPA: 8.45',
      icon: <FaUniversity className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20'
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'DVC Hr Sec School',
      period: '2020–2021',
      score: '89.9%',
      icon: <FaAward className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20'
    },
    {
      degree: 'Matriculation',
      institution: 'DVC Hr Sec School',
      period: '2018–2019',
      score: '92.0%',
      icon: <FaGraduationCap className="w-6 h-6" />,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20'
    }
  ];

  return (
    <section
      id="about"
      className="pt-20 sm:pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 pointer-events-none" />
      
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
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Passionate Junior Fullstack Developer with a strong foundation in modern web technologies
          </motion.p>
        </motion.div>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 mb-12"
          >
            <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I'm a recent <span className="font-bold text-blue-600 dark:text-blue-400">BE Information Technology</span> graduate from <span className="font-semibold">Annamalai University</span> with a CGPA of <span className="font-bold text-purple-600 dark:text-purple-400">8.45</span>. My journey in tech has equipped me with a diverse skill set spanning frontend and backend development, automation testing, and AI/ML tools.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                I specialize in building responsive web applications using <span className="font-semibold text-emerald-600 dark:text-emerald-400">React</span>, <span className="font-semibold text-blue-600 dark:text-blue-400">Node.js</span>, and <span className="font-semibold text-amber-600 dark:text-amber-400">Python</span>. I'm passionate about creating efficient solutions and continuously learning new technologies to stay ahead in the rapidly evolving tech landscape.
              </motion.p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative bg-gradient-to-br ${highlight.bgGradient} rounded-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10 text-center">
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${highlight.gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    {highlight.icon}
                  </motion.div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                    {highlight.number}
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">
                    {highlight.label}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {highlight.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Education Journey
            </span>
          </motion.h3>

          <div className="space-y-6 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -3 }}
                className={`relative bg-gradient-to-br ${edu.bgGradient} rounded-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${edu.gradient} group-hover:w-2 transition-all duration-300`} />
                
                <div className="flex items-start gap-6">
                  <motion.div
                    className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${edu.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    {edu.icon}
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {edu.degree}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {edu.period}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${edu.gradient} text-white shadow-md`}>
                        {edu.score}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;