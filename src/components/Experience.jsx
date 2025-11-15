import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaTools, FaCertificate } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      title: 'Junior Full Stack Developer',
      company: 'Carescribe Healthcare Private Limited',
      period: 'Jul 2025 - Present (Ongoing)',
      location: 'Chennai, India',
      description: 'Built CareScribe, a full-stack medical transcription platform that converts doctor-patient conversations into OPD sheets. Implemented PostgreSQL, Express, Node.js, React, WebSockets, Cloud Storage, and Pub/Sub architecture. Developed Swagger documentation, API key security functions, and integrated Python chat APIs for enhanced functionality. Visit: https://carescribe.health',
      icon: <FaCode className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'Fullstack Internship Developer',
      company: 'Carescribe Healthcare Private Limited',
      period: 'Mar 2025 - Jun 2025 (4 months)',
      location: 'Chennai, India',
      description: 'Developed a comprehensive healthcare application using Node.js and React with extensive functionality for doctors. Created features for generating OPD, IPD, and discharge summaries by recording conversations. Integrated LLM and prompt engineering for automated response generation. Gained expertise in React, Node.js, Python, PostgreSQL, Google Cloud, Swagger documentation, Docker, Kubernetes, PubSub, and WebSockets. Visit: https://carescribe.health',
      icon: <FaRobot className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'AI/ML Internship Scholar',
      company: 'AIIRF-EDII',
      period: '05/06/2024 - 05/07/2024',
      location: 'Chidambaram',
      description: 'Learned about Various Clusters, Regression, Deep Learning Techniques, and different AI/ML Tools. Gained hands-on experience with machine learning algorithms and data processing.',
      icon: <FaRobot className="w-6 h-6" />,
      color: 'purple'
    },
    {
      title: 'UI/UX Internship Scholar',
      company: 'AIIRF-EDII',
      period: '05/06/2023 - 05/07/2023',
      location: 'Chidambaram',
      description: 'Learned to use App landing templates, project management, and gained better understanding of UI/UX principles. Developed skills in user interface design and user experience optimization.',
      icon: <FaCode className="w-6 h-6" />,
      color: 'indigo'
    }
  ];

  const achievements = [
    {
      title: 'DCA (Diploma in Computer Application)',
      description: 'Completed comprehensive training in MS Word, Excel, Tally ERP9, and PowerPoint',
      year: '2021'
    },
    {
      title: 'Typewriting English Junior',
      description: 'First class certification in Typewriting English Junior',
      year: '2019'
    }
  ];

  const currentSkills = [
    {
      category: 'Frontend Development',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design', 'WebSockets']
    },
    {
      category: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'REST APIs', 'FastAPI', 'PostgreSQL']
    },
    {
      category: 'Cloud & DevOps',
      skills: ['Google Cloud Platform', 'Docker', 'Kubernetes', 'Cloud Storage', 'Pub/Sub', 'API Security']
    },
    {
      category: 'AI & Machine Learning',
      skills: ['LLM Integration', 'Prompt Engineering', 'Chat APIs', 'LangChain', 'Google Gemini AI', 'FAISS']
    },
    {
      category: 'Documentation & Tools',
      skills: ['Swagger Documentation', 'Git', 'GitHub', 'VS Code', 'Postman', 'OpenAPI', 'Chatbot Development']
    }
  ];

  return (
    <section
      id="experience"
      className="pt-12 sm:pt-16 lg:pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-indigo-50 to-slate-100 dark:from-black/70 dark:via-black/40 dark:to-black/70 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 text-slate-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Experience & Skills
          </h2>
          <p className="text-lg text-slate-700 dark:text-gray-200 max-w-3xl mx-auto">
            My professional journey in healthcare technology and technical expertise as a Fullstack Developer
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Work Experience
            </h3>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-lg bg-white dark:bg-white/5 backdrop-blur border border-slate-200/70 dark:border-white/10 shadow-md border-l-4 ${
                  exp.color === 'blue' ? 'border-blue-600' :
                  exp.color === 'green' ? 'border-green-600' :
                  exp.color === 'purple' ? 'border-purple-600' : 'border-indigo-600'
                }`}
              >
                  <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    exp.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    exp.color === 'green' ? 'bg-green-100 text-green-600' :
                    exp.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {exp.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                      {exp.title}
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 font-medium mb-1">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-slate-500 dark:text-gray-300 text-sm mb-3">{exp.period}</p>
                    <p className="text-slate-700 dark:text-gray-100 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Current Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Current Technical Skills
            </h3>

            <div className="space-y-6">
              {currentSkills.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-white/5 backdrop-blur p-6 rounded-lg shadow-md border border-slate-200/70 dark:border-white/10"
                >
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <FaTools className="w-5 h-5 text-blue-300" />
                    {category.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-200 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-white/5 backdrop-blur p-6 rounded-lg shadow-md border border-slate-200/70 dark:border-white/10"
              >
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FaCertificate className="w-5 h-5 text-yellow-300" />
                Certifications & Achievements
              </h4>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{achievement.title}</p>
                      <p className="text-slate-700 dark:text-gray-200 text-sm">{achievement.description}</p>
                    </div>
                    <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">{achievement.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
