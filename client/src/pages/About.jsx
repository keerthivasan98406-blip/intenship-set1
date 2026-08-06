import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBookOpen, FiCheckCircle, FiMapPin, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function About() {
  const personalInfo = [
    { label: 'Full Name',   value: 'Keerthivasan A' },
    { label: 'Role',        value: 'Full Stack Web Developer | MERN Stack Developer | AI Developer' },
    { label: 'Location',    value: 'Velamur, Ramapuram, Chengalpattu Dist, Tamil Nadu, India' },
    { label: 'Email',       value: 'keerthivasan98406@gmail.com' },
    { label: 'GitHub',      value: 'github.com/keerthivasan98406-blip' },
    { label: 'LinkedIn',    value: 'linkedin.com/in/keerthi98406' },
    { label: 'Portfolio',   value: 'keerthivasan.onrender.com' },
    { label: 'Availability', value: 'Open to Full-Time & Freelance Roles' },
  ];

  const education = [
    {
      degree: 'B.E. / B.Tech in Computer Science & Engineering',
      institution: 'Anna University Affiliated College',
      year: '2020 — 2024',
      grade: 'First Class',
      details: 'Specialized in Data Structures, Web Technologies, Database Management Systems, Object-Oriented Programming, and Software Engineering principles.',
    },
    {
      degree: 'Full Stack MERN Development',
      institution: 'Self-Learning & Online Certifications',
      year: '2022 — Present',
      grade: 'Certified',
      details: 'Completed extensive training in React.js, Node.js, Express.js, MongoDB, Tailwind CSS, Framer Motion, and AI/ML integrations.',
    },
  ];

  const highlights = [
    'MERN Stack (MongoDB, Express, React, Node.js)',
    'REST API Design & JWT Authentication',
    'React.js, Tailwind CSS, Framer Motion',
    'MongoDB Atlas & Mongoose Schema Design',
    'AI / LLM Integration & Automation',
    'Socket.io Real-Time Applications',
    'Deployment: Render, Vercel, MongoDB Atlas',
    'Clean Code, MVC Architecture & Best Practices',
  ];

  const timeline = [
    {
      role: 'Full Stack MERN Developer',
      company: 'Leonux Technologies',
      period: '2024 — Present',
      description: 'Building production-grade MERN stack applications, AI-powered platforms, and real-time web solutions. Developed 10+ live projects including Leonux AI, chat applications, and e-commerce platforms.',
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2023 — 2024',
      description: 'Delivered custom web solutions for clients including Manjula Mobiles World, Nature Care Impex, Yogi Pathipagam, and MotoForce. Focused on responsive UI, REST APIs, and MongoDB databases.',
    },
    {
      role: 'Web Development Intern',
      company: 'Tech Startup (Tamil Nadu)',
      period: '2022 — 2023',
      description: 'Gained hands-on experience in HTML5, CSS3, JavaScript ES6+, React.js, and backend development with Node.js and Express. Contributed to multiple client projects.',
    },
  ];

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '5rem', maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem 5rem' }}>

      {/* Header */}
      <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="section-tag" style={{ margin: '0 auto 1rem' }}>
          <FiUser size={13} />
          <span>Get To Know Me</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: '900', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#f1f5f9', marginBottom: '1rem' }}>
          About <span className="gradient-text">Me</span>
        </h1>
        <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>
          A passionate developer from Tamil Nadu, India, building scalable web apps and AI solutions with the MERN stack.
        </p>
      </motion.div>

      {/* Grid: Intro + Personal Info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>

        {/* Personal Summary */}
        <motion.div {...fadeUp(0.1)} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUser style={{ color: 'var(--cyan)' }} /> Professional Summary
          </h3>
          <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '0.92rem', marginBottom: '1rem' }}>
            I am <strong style={{ color: '#f1f5f9' }}>Keerthivasan A</strong>, a dedicated Full Stack Web Developer and MERN Stack Developer from Tamil Nadu, India. I specialize in building end-to-end web applications, from beautiful React frontends to robust Node.js/Express backends with MongoDB databases.
          </p>
          <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '0.88rem' }}>
            <strong style={{ color: 'var(--cyan)' }}>Career Objective:</strong> To leverage modern full-stack technologies, AI integrations, and clean architecture principles to deliver impactful digital solutions that drive real business value.
          </p>
        </motion.div>

        {/* Personal Info */}
        <motion.div {...fadeUp(0.2)} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '1.2rem' }}>
            Personal Information
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {personalInfo.map((info, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--cyan)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{info.label}</span>
                <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500' }}>{info.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technical Highlights */}
        <motion.div {...fadeUp(0.3)} className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '1.2rem' }}>
            Technical Highlights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {highlights.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8' }}>
                <FiCheckCircle size={14} style={{ color: 'var(--cyan)', marginTop: '2px', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Education */}
      <motion.section {...fadeUp(0.1)} style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag" style={{ margin: '0 auto 0.75rem' }}>
            <FiBookOpen size={13} />
            <span>Academic Background</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#f1f5f9' }}>
            Education <span className="gradient-text">& Credentials</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {education.map((edu, i) => (
            <motion.div key={i} {...fadeUp(0.1 * i)} className="glass-card" style={{ padding: '1.8rem' }}>
              <span style={{ display: 'inline-block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', padding: '0.25rem 0.75rem', borderRadius: '100px', background: 'rgba(6,182,212,0.1)', color: 'var(--cyan)', border: '1px solid rgba(6,182,212,0.25)', marginBottom: '0.75rem' }}>
                {edu.year}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>{edu.degree}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: '600', marginBottom: '0.75rem' }}>
                {edu.institution} — <span style={{ color: '#94a3b8', fontWeight: '400' }}>{edu.grade}</span>
              </p>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: '1.6' }}>{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section {...fadeUp(0.1)}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag" style={{ margin: '0 auto 0.75rem' }}>
            <FiBriefcase size={13} />
            <span>Work Experience</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#f1f5f9' }}>
            Experience <span className="gradient-text">Timeline</span>
          </h2>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '20px', top: 0, bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--cyan), var(--blue), transparent)',
            borderRadius: '2px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '3rem' }}>
            {timeline.map((item, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)} style={{ position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-2.7rem',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'var(--bg-deep)',
                  border: '2px solid var(--cyan)',
                  boxShadow: '0 0 12px rgba(6,182,212,0.5)',
                  top: '1.2rem',
                }} />
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontWeight: '600' }}>{item.period}</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1rem', color: '#f1f5f9', margin: '0.3rem 0 0.2rem' }}>{item.role}</h3>
                  <p style={{ fontSize: '0.82rem', fontWeight: '600', color: '#7dd3fc', marginBottom: '0.6rem' }}>{item.company}</p>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: '1.6' }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
