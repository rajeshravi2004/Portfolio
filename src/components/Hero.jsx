import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRocket, FaCode } from 'react-icons/fa';
import herologo from '../assets/herologo.png';
const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 dark:from-black/60 dark:via-black/30 dark:to-black/60 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 items-center">
          <motion.div
            className="space-y-5 sm:space-y-6 lg:space-y-8 scroll-reveal order-2 lg:order-1 text-slate-900 dark:text-white"
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
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-emerald-600 dark:text-green-300 font-light text-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Junior Fullstack Developer
              </motion.h2>
            </div>

            <motion.p
              className="text-lg sm:text-xl text-slate-700 dark:text-gray-100/90 leading-relaxed max-w-2xl text-shadow"
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
                <span className="font-medium text-slate-800 dark:text-gray-100">Tamilnadu, India</span>
              </motion.div>
              <motion.div
                className="glass-morphism flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-2xl hover-lift w-full sm:w-auto justify-center sm:justify-start"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <FaPhone className="text-blue-600 dark:text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-slate-800 dark:text-gray-100">+91-8883761709</span>
              </motion.div>
              <motion.div
                className="glass-morphism flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3 rounded-2xl hover-lift w-full sm:w-auto justify-center sm:justify-start"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <FaEnvelope className="text-cyan-600 dark:text-cyan-400 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-slate-800 dark:text-gray-100">ravirajesh988@gmail.com</span>
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
