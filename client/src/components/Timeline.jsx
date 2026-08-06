import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiBookOpen } from 'react-icons/fi';

const experience = [
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Leonux Technologies',
    period: '2023 – Present',
    description: 'Built and maintained full-stack web applications using MERN stack. Developed AI-powered tools, REST APIs, and responsive UIs for clients.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AI/ML'],
  },
  {
    type: 'work',
    title: 'Web Developer Intern',
    company: 'Freelance Projects',
    period: '2022 – 2023',
    description: 'Developed multiple client websites and web applications. Worked on e-commerce platforms, business portals, and real-time applications.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
  },
];

const education = [
  {
    type: 'education',
    title: 'B.Sc. Computer Science',
    company: 'College of Arts & Science',
    period: '2020 – 2023',
    description: 'Graduated with a focus on programming, data structures, algorithms, and web development technologies.',
    skills: ['Java', 'Python', 'Data Structures', 'DBMS'],
  },
];

export default function Timeline() {
  const all = [...experience, ...education];

  return (
    <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
      {/* Vertical line */}
      <div className="timeline-line" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {all.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            style={{ position: 'relative' }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: '-2rem',
              top: '0.4rem',
            }}>
              <div className="timeline-dot" />
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {item.type === 'work'
                    ? <FiBriefcase size={16} style={{ color: 'var(--accent-cyan)' }} />
                    : <FiBookOpen size={16} style={{ color: 'var(--accent-cyan)' }} />}
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                    {item.title}
                  </h4>
                </div>
                <span style={{
                  fontSize: '0.78rem', color: 'var(--accent-cyan)',
                  background: 'rgba(6,182,212,0.1)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)',
                  fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                  {item.period}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.6rem', opacity: 0.8 }}>
                {item.company}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.skills.map((s) => (
                  <span key={s} style={{
                    fontSize: '0.72rem', padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-muted)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
