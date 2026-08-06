import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import { messageService } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await messageService.create(form);
      showToast('success', 'Message sent! I\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      showToast('error', 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail size={20} />,
      label: 'Email',
      value: 'keerthivasan98406@gmail.com',
      href: 'mailto:keerthivasan98406@gmail.com',
      color: '#06b6d4',
    },
    {
      icon: <FiMapPin size={20} />,
      label: 'Location',
      value: 'Velamur, Ramapuram, Chengalpattu, Tamil Nadu',
      href: 'https://maps.google.com',
      color: '#2563eb',
    },
    {
      icon: <FiGithub size={20} />,
      label: 'GitHub',
      value: 'keerthivasan98406-blip/intenship-set1',
      href: 'https://github.com/keerthivasan98406-blip/intenship-set1',
      color: '#a855f7',
    },
    {
      icon: <FiLinkedin size={20} />,
      label: 'LinkedIn',
      value: 'keerthi98406',
      href: 'https://www.linkedin.com/in/keerthi98406',
      color: '#0077b5',
    },
  ];

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: 'var(--radius-md)',
    background: 'rgba(13,21,38,0.8)',
    border: '1px solid rgba(6,182,212,0.15)',
    color: 'var(--text-primary)',
    fontSize: '0.93rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-body)',
  };

  return (
    <section className="section-padding" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FiMail size={13} />
            Get In Touch
          </div>
          <h2 className="section-title">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '3rem',
          alignItems: 'start',
        }}
          className="contact-grid"
        >
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem', color: '#fff' }}>
              Let's work together
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
              I'm currently open to freelance opportunities and full-time roles. 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href} target="_blank" rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="glass-card" style={{
                    padding: '1rem 1.2rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = info.color; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-glass)'; }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                      background: `${info.color}15`,
                      border: `1px solid ${info.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: info.color, flexShrink: 0,
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {info.label}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {info.value}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Full Name *
                    </label>
                    <input type="text" required placeholder="Your name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(6,182,212,0.15)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email *
                    </label>
                    <input type="email" required placeholder="your@email.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(6,182,212,0.15)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Phone
                    </label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(6,182,212,0.15)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Subject *
                    </label>
                    <input type="text" required placeholder="Project inquiry"
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(6,182,212,0.15)')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Message *
                  </label>
                  <textarea required rows={5} placeholder="Tell me about your project..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(6,182,212,0.15)')}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary"
                  style={{ justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem' }}
                >
                  {loading ? (
                    <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  ) : (
                    <>
                      <FiSend size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.text}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
