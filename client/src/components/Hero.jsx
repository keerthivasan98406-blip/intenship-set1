import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaJava } from 'react-icons/fa';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

const ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'AI Developer',
  'React.js Developer',
  'Node.js Developer',
];

// Tech icons floating around profile
const TECH_ICONS = [
  { icon: <FaHtml5 size={20} color="#e34f26" />,  label: 'HTML5',   angle: 0,   bg: 'rgba(227,79,38,0.12)',   border: 'rgba(227,79,38,0.25)'   },
  { icon: <FaCss3Alt size={20} color="#1572b6" />, label: 'CSS3',    angle: 60,  bg: 'rgba(21,114,182,0.12)',  border: 'rgba(21,114,182,0.25)'  },
  { icon: <FaReact size={20} color="#61dafb" />,   label: 'React',   angle: 120, bg: 'rgba(97,218,251,0.12)',  border: 'rgba(97,218,251,0.25)'  },
  { icon: <FaNodeJs size={20} color="#339933" />,  label: 'Node.js', angle: 180, bg: 'rgba(51,153,51,0.12)',   border: 'rgba(51,153,51,0.25)'   },
  { icon: <FaPython size={20} color="#3776ab" />,  label: 'Python',  angle: 240, bg: 'rgba(55,118,171,0.12)',  border: 'rgba(55,118,171,0.25)'  },
  { icon: <FaJava size={20} color="#f89820" />,    label: 'Java',    angle: 300, bg: 'rgba(248,152,32,0.12)',  border: 'rgba(248,152,32,0.25)'  },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!deleting && text.length < cur.length)
      t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 75);
    else if (!deleting && text.length === cur.length)
      t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && text.length > 0)
      t = setTimeout(() => setText(cur.slice(0, text.length - 1)), 40);
    else { setDeleting(false); setRoleIdx(p => (p + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);



  // Orbit radius for tech icons
  const ORBIT_R = 170;

  return (
    <section style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          padding: '8rem 1.5rem 3rem',
          gap: '5rem',
        }}
        className="hero-wrap"
      >
        {/* ── LEFT: Profile + Floating Icons ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="hero-img-col"
        >
          {/* Container sized to fit orbit + icons */}
          <div style={{ position: 'relative', width: '380px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* ── Floating Tech Icons ── */}
            {TECH_ICONS.map((tech, i) => {
              const rad = (tech.angle * Math.PI) / 180;
              const x = Math.cos(rad) * ORBIT_R;
              const y = Math.sin(rad) * ORBIT_R;
              return (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 180, damping: 14 }}
                  whileHover={{ scale: 1.25, zIndex: 20 }}
                  title={tech.label}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: tech.bg,
                    border: `1px solid ${tech.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'default',
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px ${tech.border}`,
                    zIndex: 5,
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  {tech.icon}
                  <span style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.03em' }}>
                    {tech.label}
                  </span>
                </motion.div>
              );
            })}

            {/* Dashed orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: `${ORBIT_R * 2 + 48}px`,
                height: `${ORBIT_R * 2 + 48}px`,
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.05)',
                pointerEvents: 'none',
              }}
            />

            {/* Profile circle */}
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
              {/* Spinning gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-3px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0%, #06b6d4 30%, transparent 60%, #2563eb 80%, transparent 100%)',
                  opacity: 0.8,
                }}
              />
              <div style={{ position: 'absolute', inset: '1px', borderRadius: '50%', background: '#000' }} />

              {/* Inner content — profile photo */}
              <div style={{
                position: 'absolute', inset: '5px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#0a0a0a',
              }}>
                <img
                  src="/profile.png"
                  alt="Keerthivasan A"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '50%',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback if image not found */}
                <div style={{
                  display: 'none',
                  width: '100%', height: '100%',
                  alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #0a0a0a, #111)',
                }}>
                  <span style={{
                    fontSize: '2.2rem', fontWeight: 900,
                    background: 'linear-gradient(135deg,#06b6d4,#2563eb)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>KA</span>
                  <span style={{ fontSize: '0.52rem', color: 'rgba(6,182,212,0.4)', letterSpacing: '0.18em', marginTop: '0.3rem' }}>
                    KEERTHIVASAN
                  </span>
                </div>
              </div>

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{
                  position: 'absolute',
                  bottom: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.92)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  borderRadius: '20px',
                  padding: '0.28rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#22c55e',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}
                />
                Open to work
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Text Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1 }}
          className="hero-text-col"
        >
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.28rem 0.85rem',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--text-2)',
            marginBottom: '1.5rem',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            Full Stack & AI Developer · Tamil Nadu, India
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: '#fff',
            marginBottom: '1rem',
          }}>
            Hello, I'm<br />
            <span style={{
              background: 'linear-gradient(120deg, #fff 40%, rgba(255,255,255,0.45))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Keerthivasan A
            </span>
          </h1>

          {/* Typing text */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            marginBottom: '1.4rem', minHeight: '1.8rem', flexWrap: 'wrap',
          }}>
            <span style={{ color: 'var(--text-2)', fontSize: '1.05rem' }}>And I'm a</span>
            <span style={{
              color: 'var(--accent)',
              fontSize: '1.05rem',
              fontWeight: 700,
              textShadow: '0 0 20px rgba(6,182,212,0.45)',
            }}>
              {text}
            </span>
            <span className="cursor" />
          </div>

          <p style={{
            color: 'var(--text-2)',
            fontSize: '0.93rem',
            lineHeight: 1.75,
            maxWidth: '440px',
            marginBottom: '1.8rem',
          }}>
            Passionate developer building scalable web applications and AI-powered tools.
            Specializing in MERN Stack — MongoDB, Express, React & Node.js.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.8rem' }}>
            {[
              { icon: <FaGithub size={15} />, label: 'GitHub',   href: 'https://github.com/keerthivasan98406-blip/intenship-set1' },
              { icon: <FaLinkedin size={15} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/keerthi98406' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.42rem 1rem',
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-2)',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  transition: 'var(--transition)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-2)'; }}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <motion.a href="/projects" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.68rem 1.6rem', borderRadius: '20px',
                background: '#fff', color: '#000',
                fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              }}
            >
              View Projects <FiArrowRight size={15} />
            </motion.a>

            <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.68rem 1.6rem', borderRadius: '20px',
                background: 'transparent', color: '#fff',
                fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
            >
              Get in touch
            </motion.a>

            <motion.a href="/resume.pdf" download whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.68rem 1.4rem', borderRadius: '20px',
                background: 'rgba(6,182,212,0.1)', color: 'var(--accent)',
                fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
            >
              <FiDownload size={14} /> Resume
            </motion.a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-wrap{ flex-direction:column!important; padding-top:7rem!important; gap:2rem!important; text-align:center; }
          .hero-img-col>div{ width:300px!important; height:300px!important; }
        }
      `}</style>
    </section>
  );
}
