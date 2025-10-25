import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaRocket, FaHeart, FaStar, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'ravirajesh988@gmail.com'
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again or contact directly via email.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setError('');
    setIsSuccess(false);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: 'Phone',
      value: '+91-8883761709',
      href: 'tel:+918883761709'
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: 'Email',
      value: 'ravirajesh988@gmail.com',
      href: 'mailto:ravirajesh988@gmail.com'
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: 'Location',
      value: 'Tamilnadu, India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      title: 'GitHub',
      href: 'https://github.com/rajeshravi2004/Chatbot',
      color: 'hover:text-gray-900'
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rajesh-ravi-22684130b/',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <section id="contact" className="pt-12 sm:pt-16 lg:pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/30 to-blue-400/30 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-violet-400/15 to-fuchsia-400/15 dark:from-violet-500/10 dark:to-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-500 animate-morph"></div>

        {/* Additional floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce-slow opacity-60 hover-lift"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-float opacity-50 hover-lift"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse-slow opacity-70 hover-lift"></div>

        {/* Particle system - Optimized */}
        <div className="particles">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${15 + (i * 20)}%`,
                top: `${20 + (i * 20)}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${10 + (i * 2)}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ willChange: 'opacity, transform' }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can work together and bring your ideas to life!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ willChange: 'opacity, transform' }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <motion.h3
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Let's Connect
              </motion.h3>
              <motion.p
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Whether you have a project in mind, need technical consultation,
                or just want to say hello, I'd love to hear from you. Let's create something amazing together!
              </motion.p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative glass-morphism rounded-2xl p-6 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>

                  <div className="relative z-10 flex items-center gap-5">
                    <motion.div
                      className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                      <div className="relative z-10">
                        {info.icon}
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                        {info.title}
                      </h4>
                      {info.href.startsWith('http') || info.href.startsWith('mailto') || info.href.startsWith('tel') ? (
                        <a
                          href={info.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{info.value}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.3 + (index * 0.1),
                    type: "spring",
                    stiffness: 120
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.15,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative p-5 glass-morphism rounded-2xl text-gray-600 dark:text-gray-400 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    {social.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ willChange: 'opacity, transform' }}
            className="relative"
          >
            <motion.div
              className="glass-morphism rounded-3xl p-8 shadow-2xl hover-lift transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-purple-500/5 dark:from-white/10 dark:to-purple-500/5"></div>

              {/* Floating accent elements */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce delay-300 opacity-60"></div>
              <div className="absolute bottom-6 left-6 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse delay-700 opacity-60"></div>

              <div className="relative z-10">
                <motion.h3
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Send Me a Message
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 glass-morphism border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 dark:bg-gray-800/50 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter your name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 glass-morphism border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 dark:bg-gray-800/50 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 glass-morphism border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 dark:bg-gray-800/50 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-5 py-4 glass-morphism border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none dark:bg-gray-800/50 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                    />
                  </motion.div>

                  {/* Success/Error Messages */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-2xl text-red-700 dark:text-red-300 text-center"
                    >
                      <p className="font-medium">{error}</p>
                    </motion.div>
                  )}

                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600 rounded-2xl text-green-700 dark:text-green-300 text-center"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FaStar className="w-4 h-4" />
                        <p className="font-medium">Message sent successfully! I'll get back to you soon.</p>
                        <FaStar className="w-4 h-4" />
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                    whileHover={isLoading ? {} : {
                      scale: 1.03,
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
                    }}
                    whileTap={isLoading ? {} : { scale: 0.97 }}
                    className={`w-full group relative glass-morphism border-2 font-semibold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                      isLoading
                        ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : isSuccess
                        ? 'border-green-300 dark:border-green-400 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                        : 'border-purple-300 dark:border-purple-400 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white hover:shadow-2xl'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-2xl animate-pulse ${isLoading ? 'bg-gray-200/50 dark:bg-gray-700/50' : 'bg-white/20'}`}></div>
                    <div className="relative z-10 flex items-center gap-3">
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <FaSpinner className="w-5 h-5" />
                        </motion.div>
                      ) : isSuccess ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <FaStar className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaPaperPlane className="w-5 h-5" />
                        </motion.div>
                      )}
                      <span>
                        {isLoading ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
                      </span>
                    </div>
                    {!isLoading && !isSuccess && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-5 glass-morphism rounded-full border-2 border-purple-300 dark:border-purple-400 shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaRocket className="text-2xl text-purple-600 dark:text-purple-400" />
            </motion.div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
              Ready to start your next project?{' '}
              <span className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Let's talk!
              </span>
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-xl text-red-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
