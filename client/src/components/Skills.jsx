import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava,
  FaGitAlt, FaGithub, FaBootstrap, FaDatabase, FaServer,
} from 'react-icons/fa';
import { FiCode, FiTool, FiSend, FiZap } from 'react-icons/fi';
import { Cpu } from 'lucide-react';

const skillGroups = [
  {
    category: 'Frontend',
    color: '#06b6d4',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 color="#e34f26" size={28} />, level: 95 },
      { name: 'CSS3', icon: <FaCss3Alt color="#1572b6" size={28} />, level: 90 },
      { name: 'JavaScript', icon: <FaJs color="#f7df1e" size={28} />, level: 92 },
      { name: 'React.js', icon: <FaReact color="#61dafb" size={28} />, level: 90 },
      { name: 'Tailwind CSS', icon: <FiZap color="#06b6d4" size={28} />, level: 88 },
      { name: 'Bootstrap', icon: <FaBootstrap color="#7952b3" size={28} />, level: 85 },
    ],
  },
  {
    category: 'Backend',
    color: '#2563eb',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs color="#339933" size={28} />, level: 88 },
      { name: 'Express.js', icon: <FaServer color="#94a3b8" size={28} />, level: 87 },
    ],
  },
  {
    category: 'Database',
    color: '#a855f7',
    skills: [
      { name: 'MongoDB', icon: <FaDatabase color="#47a248" size={28} />, level: 85 },
      { name: 'MySQL', icon: <FaDatabase color="#4479a1" size={28} />, level: 80 },
    ],
  },
  {
    category: 'Programming',
    color: '#f59e0b',
    skills: [
      { name: 'Python', icon: <FaPython color="#3776ab" size={28} />, level: 78 },
      { name: 'Java', icon: <FaJava color="#007396" size={28} />, level: 72 },
    ],
  },
  {
    category: 'Tools',
    color: '#10b981',
    skills: [
      { name: 'Git', icon: <FaGitAlt color="#f05032" size={28} />, level: 88 },
      { name: 'GitHub', icon: <FaGithub color="#94a3b8" size={28} />, level: 88 },
      { name: 'VS Code', icon: <FiCode color="#007acc" size={28} />, level: 95 },
      { name: 'Postman', icon: <FiSend color="#ff6c37" size={28} />, level: 85 },
      { name: 'Vercel', icon: <FiTool color="#94a3b8" size={28} />, level: 82 },
      { name: 'Framer Motion', icon: <FaReact color="#06b6d4" size={28} />, level: 78 },
    ],
  },
];

function ProgressBar({ level, color }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      width: '100%', height: '6px',
      background: 'rgba(255,255,255,0.06)',
      borderRadius: '3px', overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        width: animated ? `${level}%` : '0%',
        background: `linear-gradient(90deg, ${color}, #06b6d4)`,
        borderRadius: '3px',
        transition: 'width 1s ease-in-out',
        boxShadow: `0 0 8px ${color}60`,
      }} />
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section-padding" id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={13} />
            Technical Skills
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical stack — from frontend to backend, databases, and developer tools.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              {/* Category Label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  height: '2px', width: '32px',
                  background: group.color,
                  borderRadius: '2px',
                  boxShadow: `0 0 8px ${group.color}`,
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: group.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {group.category}
                </h3>
              </div>

              {/* Skills Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1rem',
              }}>
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: si * 0.05 }}
                    className="glass-card"
                    style={{ padding: '1.2rem 1.5rem' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = group.color;
                      e.currentTarget.style.boxShadow = `0 0 20px ${group.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {skill.icon}
                        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.8rem', fontWeight: 700,
                        color: group.color, fontFamily: 'var(--font-mono)',
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    <ProgressBar level={skill.level} color={group.color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
