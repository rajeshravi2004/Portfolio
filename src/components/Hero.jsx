import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRocket, FaCode } from 'react-icons/fa';
import herologo from '../assets/herologo.png';
const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden gradient-mesh">
      {/* Enhanced animated background elements - Optimized */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-cyan-400/30 to-pink-400/30 dark:from-cyan-500/20 dark:to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[32rem] sm:h-[32rem] bg-gradient-to-r from-violet-400/15 to-fuchsia-400/15 dark:from-violet-500/10 dark:to-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>

        {/* Additional floating elements - Optimized for mobile */}
        <div className="absolute top-16 left-8 sm:top-20 sm:left-20 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce-slow opacity-60 hover-lift" style={{ willChange: 'transform' }}></div>
        <div className="absolute bottom-24 right-8 sm:bottom-32 sm:right-32 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-float opacity-50 hover-lift" style={{ willChange: 'transform' }}></div>
        <div className="absolute top-1/3 right-1/5 sm:right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse-slow opacity-70 hover-lift" style={{ willChange: 'opacity' }}></div>

        {/* Particle system - Optimized for mobile performance */}
        <div className="particles">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${15 + (i * 20)}%`,
                top: `${20 + (i * 15)}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${10 + (i * 2)}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 items-center">
          <motion.div
            className="space-y-5 sm:space-y-6 lg:space-y-8 scroll-reveal order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            style={{ willChange: 'opacity, transform' }}
          >{/* This closes at the end of the left column content */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Hi, I'm{' '}
                <motion.span
                  className="text-gradient relative inline-block"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Rajesh R
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.span>
              </motion.h1>
              <motion.h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-700 dark:text-gray-300 font-light text-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Junior Fullstack Developer
              </motion.h2>
            </div>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl text-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Passionate fullstack developer with expertise in React, Node.js, Python, and modern web technologies.
              I love building scalable applications and solving complex problems with clean, efficient code.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="glass-morphism flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-2xl hover-lift w-full sm:w-auto justify-center sm:justify-start"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Tamilnadu, India</span>
              </motion.div>
              <motion.div
                className="glass-morphism flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-2xl hover-lift w-full sm:w-auto justify-center sm:justify-start"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <FaPhone className="text-blue-600 dark:text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-gray-700 dark:text-gray-200">+91-8883761709</span>
              </motion.div>
              <motion.div
                className="glass-morphism flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-2xl hover-lift w-full sm:w-auto justify-center sm:justify-start"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <FaEnvelope className="text-cyan-600 dark:text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-gray-700 dark:text-gray-200">ravirajesh988@gmail.com</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/rajeshravi2004"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-4 shadow-lg hover:shadow-xl w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/rajesh-ravi-22684130b/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern group relative flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-4 shadow-lg hover:shadow-xl w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://github.com/rajeshravi2004/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-morphism border-2 border-purple-300 dark:border-purple-400 bg-white/80 dark:bg-gray-800/80 text-purple-700 dark:text-purple-300 px-6 sm:px-8 py-4 sm:py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover-lift w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="w-5 h-5" />
                <span>View Portfolio</span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative scroll-reveal order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            style={{ willChange: 'opacity, transform' }}
          >
            <motion.div
              className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full flex items-center justify-center text-white text-5xl sm:text-7xl font-bold relative overflow-hidden animate-morph hover-lift z-20"
              whileHover={{ scale: 1.05, rotate: 5 }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              }}
              animate={{
                background: [
                  "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                  "linear-gradient(135deg, #764ba2 0%, #f093fb 50%, #667eea 100%)",
                  "linear-gradient(135deg, #f093fb 0%, #667eea 50%, #764ba2 100%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse z-10"></div>
              <motion.div className="relative z-30">
               <img
                src={herologo}
                alt="Rajesh R - Profile"
                className="w-full h-[500px] rounded-full object-cover transform"
                style={{
                  filter: 'contrast(1.1) saturate(1.1)',
                  transform: 'translateY(50px)', // moves image upward by 50px
                }}
              />
              </motion.div>

              {/* Floating particles */}
              <div className="absolute top-4 right-8 w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-300 z-40"></div>
              <div className="absolute bottom-8 left-6 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-700 z-40"></div>
              <div className="absolute top-1/2 right-4 w-1 h-1 bg-cyan-300 rounded-full animate-ping delay-1000 z-40"></div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 glass-morphism rounded-full flex items-center justify-center shadow-xl hover-lift z-10"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.span
                className="text-xl sm:text-3xl"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👋
              </motion.span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-14 h-14 sm:w-20 sm:h-20 glass-morphism rounded-full flex items-center justify-center shadow-xl hover-lift z-10"
              animate={{
                y: [0, 8, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.span
                className="text-lg sm:text-2xl"
                animate={{ rotate: [0, -12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                🚀
              </motion.span>
            </motion.div>

            {/* Modern decorative rings */}
            <motion.div
              className="absolute inset-0 border-4 border-gradient rounded-full opacity-30 z-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border-2 border-gradient rounded-full opacity-20 z-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
