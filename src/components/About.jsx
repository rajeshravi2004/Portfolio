import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaRocket, FaTrophy } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      number: '8.45',
      label: 'CGPA',
      description: 'BE Information Technology',
      icon: <FaGraduationCap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '4+',
      label: 'Technologies',
      description: 'Programming Languages',
      icon: <FaCode className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '5+',
      label: 'Frameworks',
      description: 'Web Development',
      icon: <FaRocket className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '2+',
      label: 'Internships',
      description: 'Industry Experience',
      icon: <FaTrophy className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section
      id="about"
      className="pt-12 sm:pt-16 lg:pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 dark:from-black/70 dark:via-black/40 dark:to-black/60 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 text-slate-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ willChange: 'opacity, transform' }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-xl text-slate-700 dark:text-gray-100/90 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Passionate Junior Fullstack Developer with a strong foundation in modern web technologies and a drive for creating innovative solutions
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.p
                className="text-lg text-slate-700 dark:text-gray-100/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                I'm a recent BE Information Technology graduate from <span className="font-semibold text-blue-600 dark:text-blue-400">Annamalai University</span> with a CGPA of <span className="font-semibold text-purple-600 dark:text-purple-400">8.45</span>.
                My journey in tech has equipped me with a diverse skill set spanning frontend and backend development, automation testing, and AI/ML tools.
              </motion.p>

              <motion.p
                className="text-lg text-slate-700 dark:text-gray-100/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                I specialize in building responsive web applications using <span className="font-semibold text-green-600 dark:text-green-400">React</span>, <span className="font-semibold text-blue-600 dark:text-blue-400">Node.js</span>, and <span className="font-semibold text-yellow-600 dark:text-yellow-400">Python</span>.
                I'm passionate about creating efficient solutions and continuously learning new technologies to stay ahead in the rapidly evolving tech landscape.
              </motion.p>
            </div>

            {/* Enhanced Highlights Grid */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative glass-morphism rounded-2xl p-6 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Floating accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-60"></div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${highlight.color} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 mb-3`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                      <div className="relative z-10">
                        {highlight.icon}
                      </div>
                    </motion.div>

                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-sky-400 group-hover:to-purple-400 transition-all duration-300">
                      {highlight.number}
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-gray-100 mb-1">
                      {highlight.label}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-gray-300">
                      {highlight.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left mb-8">
              <motion.h3
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Education Journey
              </motion.h3>
              <motion.p
                className="text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                A solid academic foundation that fuels my passion for technology and innovation
              </motion.p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="group relative glass-morphism rounded-2xl p-6 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 group-hover:w-2 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <FaGraduationCap className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        BE in Information Technology
                      </h4>
                      <p className="text-gray-300 mb-1">Annamalai University</p>
                      <p className="text-gray-400 text-sm mb-2">2021–2025</p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          CGPA: 8.45
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
                className="group relative glass-morphism rounded-2xl p-6 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-500 group-hover:w-2 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <FaCode className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        Higher Secondary Education
                      </h4>
                      <p className="text-gray-300 mb-1">DVC Hr Sec School</p>
                      <p className="text-gray-400 text-sm mb-2">2020–2021</p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                          89.9%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
                className="group relative glass-morphism rounded-2xl p-6 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 group-hover:w-2 transition-all duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <FaTrophy className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        Matriculation
                      </h4>
                      <p className="text-gray-300 mb-1">DVC Hr Sec School</p>
                      <p className="text-gray-400 text-sm mb-2">2018–2019</p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                          92.0%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
