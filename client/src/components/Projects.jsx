import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiSearch, FiX } from 'react-icons/fi';
import { Layers } from 'lucide-react';

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'FizzUp',
    description: 'Fitness and health tracking web application with workout plans, progress tracking, and nutrition monitoring.',
    liveUrl: 'https://fizzup.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#06b6d4',
  },
  {
    id: 2,
    title: 'Leonux AI',
    description: 'AI-powered chatbot and automation platform built with advanced NLP capabilities for intelligent conversations.',
    liveUrl: 'https://leonuxai.online/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'AI',
    tags: ['React', 'Node.js', 'AI/ML', 'OpenAI'],
    color: '#a855f7',
  },
  {
    id: 3,
    title: 'Leonux Website',
    description: 'Official company website for Leonux with modern design, animations, and responsive layout.',
    liveUrl: 'https://www.leonux.online/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Frontend',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    color: '#2563eb',
  },
  {
    id: 4,
    title: 'Manjula Mobiles World',
    description: 'Mobile shop management and e-commerce website with inventory, sales, and customer management.',
    liveUrl: 'https://manjulamobilesworld-whwt.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce'],
    color: '#f59e0b',
  },
  {
    id: 5,
    title: 'Nature Care Impex Sales Portal',
    description: 'Sales management portal for Nature Care Impex with reporting, order tracking, and analytics.',
    liveUrl: 'https://sales.naturecareimpex.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Express', 'MongoDB', 'Dashboard'],
    color: '#10b981',
  },
  {
    id: 6,
    title: 'Real-Time Chat App',
    description: 'Socket.io based real-time messaging application with rooms, notifications, and online status.',
    liveUrl: 'https://chating-i73c.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    color: '#06b6d4',
  },
  {
    id: 7,
    title: 'MotoForce',
    description: 'Automobile service management platform for booking, tracking, and managing vehicle services.',
    liveUrl: 'https://motoforce.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#ef4444',
  },
  {
    id: 8,
    title: 'Yogi Pathipagam',
    description: 'Publishing and book management website for managing inventory, orders, and digital publications.',
    liveUrl: 'https://yogi-pathipagam.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB'],
    color: '#8b5cf6',
  },
  {
    id: 9,
    title: 'MyPay',
    description: 'Online payment management application with transaction history, wallet, and secure transfers.',
    liveUrl: 'https://mypay.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Payments'],
    color: '#f59e0b',
  },
  {
    id: 10,
    title: 'Four Way',
    description: 'Business and service platform connecting service providers and customers across multiple domains.',
    liveUrl: 'https://four-way.onrender.com/',
    githubUrl: 'https://github.com/keerthivasan98406-blip',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    color: '#06b6d4',
  },
];

const CATEGORIES = ['All', 'Full Stack', 'Frontend', 'AI'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = ALL_PROJECTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <section className="section-padding" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={13} />
            Portfolio
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of real-world applications I've built — from AI platforms to e-commerce systems.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem', marginBottom: '3rem',
        }}>
          {/* Category Pills */}
          <div style={{
            display: 'flex', gap: '0.5rem',
            padding: '0.3rem',
            background: 'rgba(13,21,38,0.8)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-glass)',
          }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #2563eb, #06b6d4)'
                    : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(6,182,212,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '250px' }}>
            <FiSearch size={15} style={{
              position: 'absolute', left: '1rem', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)',
            }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(13,21,38,0.8)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, idx) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setSelected(proj)}
              >
                {/* Color bar top */}
                <div style={{
                  height: '3px',
                  background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                }} />

                <div style={{ padding: '1.5rem' }}>
                  {/* Category Badge */}
                  <div style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.7rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: proj.color,
                    background: `${proj.color}15`,
                    border: `1px solid ${proj.color}30`,
                    marginBottom: '0.8rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {proj.category}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '0.6rem',
                    transition: 'color 0.2s',
                  }}>
                    {proj.title}
                  </h3>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    marginBottom: '1.2rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                    {proj.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--text-muted)',
                        fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <span style={{ fontSize: '0.83rem', color: proj.color, fontWeight: 600 }}>
                      View Details →
                    </span>
                    <div style={{ display: 'flex', gap: '0.7rem' }}>
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <FiGithub size={17} />
                      </a>
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = proj.color}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        <FiExternalLink size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No projects match your search.
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 2000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem',
              }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card"
                style={{ maxWidth: '580px', width: '100%', padding: '2rem', position: 'relative' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setSelected(null)}
                  style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', borderRadius: '50%', width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  }}
                >
                  <FiX size={16} />
                </button>

                <div style={{
                  height: '3px',
                  background: `linear-gradient(90deg, ${selected.color}, transparent)`,
                  borderRadius: '2px',
                  marginBottom: '1.5rem',
                }} />

                <span style={{
                  fontSize: '0.75rem', fontWeight: 700, color: selected.color,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {selected.category}
                </span>

                <h2 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.8rem',
                  fontWeight: 800, color: '#fff', margin: '0.5rem 0 1rem',
                }}>
                  {selected.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {selected.description}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Technologies
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selected.tags.map((tag) => (
                      <span key={tag} style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: 'var(--radius-full)',
                        background: `${selected.color}15`,
                        border: `1px solid ${selected.color}30`,
                        color: selected.color,
                        fontSize: '0.82rem', fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <FiExternalLink size={15} /> Live Demo
                  </a>
                  <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                    <FiGithub size={15} /> GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
