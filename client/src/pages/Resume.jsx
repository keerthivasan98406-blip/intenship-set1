import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiCheckCircle, FiBriefcase, FiAward, FiCode } from 'react-icons/fi';

export default function Resume() {
  const handleDownload = () => {
    // Generate a downloadable text resume blob
    const resumeText = `
ALEX VANCE — SENIOR FULL STACK MERN DEVELOPER
Email: alex.vance@example.com | Phone: +1 (555) 234-5678
Location: San Francisco, CA | Website: https://alex-vance-portfolio.vercel.app

================================================================
PROFESSIONAL SUMMARY
================================================================
Senior Full Stack Developer with 4+ years of hands-on experience architecting scalable React.js single-page applications, Node.js/Express RESTful APIs, and MongoDB database solutions.

================================================================
TECHNICAL SKILLS
================================================================
• Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Redux, React Router DOM, Framer Motion
• Backend: Node.js, Express.js, REST APIs, JWT Auth, Microservices
• Database: MongoDB, Mongoose, MySQL, SQLite
• Languages: Python, Java, JavaScript, TypeScript
• Tools: Git, GitHub, VS Code, Postman, Docker, Vite

================================================================
EXPERIENCE
================================================================
Senior Full Stack Engineer — TechVentures Innovations (2024 — Present)
• Lead 5 developers building scalable React & Express microservices.
• Optimized MongoDB query pipelines, reducing latency by 45%.

Full Stack Developer — Digital Nexus Solutions (2023 — 2024)
• Built 12+ production client web apps with React & Express.

================================================================
EDUCATION
================================================================
B.S. in Computer Science — State University of Technology (2019 — 2023)
GPA: 3.9 / 4.0 (Honors)
    `;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Alex_Vance_Senior_MERN_Developer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="section-tag">
          <FiFileText size={14} />
          <span>Curriculum Vitae</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold mb-4">
          Professional <span className="gradient-text">Resume</span>
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
          Preview my complete qualifications, tech stack mastery, work experience, and download a copy.
        </p>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-xl shadow-indigo-500/30 hover:scale-105 transition-transform"
        >
          <FiDownload size={20} />
          <span>Download Resume (.TXT / PDF)</span>
        </button>
      </motion.div>

      {/* RESUME PREVIEW CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-8 md:p-12 shadow-2xl relative border border-white/10"
      >
        {/* Document Header */}
        <div className="border-b border-white/10 pb-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-1">Alex Vance</h2>
            <p className="text-indigo-400 font-semibold text-lg">Senior Full Stack MERN Developer</p>
          </div>
          <div className="text-sm text-gray-400 space-y-1">
            <p><strong>Email:</strong> alex.vance@example.com</p>
            <p><strong>Phone:</strong> +1 (555) 234-5678</p>
            <p><strong>Location:</strong> San Francisco, CA (Open to Remote)</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-heading font-bold text-white mb-3 uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <FiAward size={18} />
            <span>Executive Summary</span>
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Senior Full Stack Developer with 4+ years of hands-on experience building scalable React.js single page web applications, high-performance Node.js/Express REST APIs, and MongoDB database solutions. Demonstrated mastery in clean MVC architecture, Tailwind CSS design systems, JWT authentication, and responsive UX design.
          </p>
        </div>

        {/* Technical Skills Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-heading font-bold text-white mb-3 uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <FiCode size={18} />
            <span>Technical Skills Matrix</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="text-white font-semibold mb-1">Frontend Development:</p>
              <p className="text-gray-400 text-xs">HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Framer Motion, Axios</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Backend Development:</p>
              <p className="text-gray-400 text-xs">Node.js, Express.js, REST API, Async Controllers, JWT Auth, Bcrypt Encryption</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Database & Storage:</p>
              <p className="text-gray-400 text-xs">MongoDB Atlas, Mongoose Schemas, MySQL, SQLite</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Languages & Tools:</p>
              <p className="text-gray-400 text-xs">Python, Java, Git, GitHub, VS Code, Postman, Vite, Docker</p>
            </div>
          </div>
        </div>

        {/* Experience Timeline Summary */}
        <div>
          <h3 className="text-lg font-heading font-bold text-white mb-4 uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <FiBriefcase size={18} />
            <span>Experience & Education</span>
          </h3>

          <div className="space-y-6 text-sm">
            <div>
              <div className="flex justify-between font-semibold text-white">
                <span>Senior Full Stack Engineer — TechVentures Studio</span>
                <span className="text-indigo-400 font-mono text-xs">2024 — Present</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Leading development of React microfrontends and Express APIs serving 50k+ daily active users.</p>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-white">
                <span>Full Stack MERN Developer — Digital Nexus Agency</span>
                <span className="text-indigo-400 font-mono text-xs">2023 — 2024</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Built 12+ full-stack web applications with React, Express, MongoDB Atlas, and Tailwind CSS.</p>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-white">
                <span>B.S. in Computer Science — State Tech University</span>
                <span className="text-indigo-400 font-mono text-xs">2019 — 2023</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Graduated with 3.9 GPA Honors. Specialization in Software Systems and Database Architectures.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
