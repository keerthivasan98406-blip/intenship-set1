import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiMapPin, FiHeart } from 'react-icons/fi';
import { HiOutlineCode } from 'react-icons/hi';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, #060c18 100%)',
      borderTop: '1px solid rgba(6,182,212,0.1)',
      padding: '4rem 0 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 16px rgba(6,182,212,0.3)',
              }}>
                <HiOutlineCode size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
                Keerthi<span style={{ color: 'var(--accent-cyan)' }}>.dev</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '240px' }}>
              Full Stack Web Developer & AI Developer building modern, scalable web applications.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
              {[
                { icon: <FaGithub size={18} />, href: 'https://github.com/keerthivasan98406-blip/intenship-set1' },
                { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/keerthi98406' },
                { icon: <FiMail size={18} />, href: 'mailto:keerthivasan@example.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(6,182,212,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-cyan)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.background = 'rgba(6,182,212,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.25)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.2rem', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {links.map((l) => (
                <Link key={l.name} to={l.path}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  → {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '1.2rem', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                <FiMapPin size={16} style={{ color: 'var(--accent-cyan)', marginTop: '3px', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Velamur, Ramapuram,<br />Chengalpattu, Tamil Nadu
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                <FiMail size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                <a href="mailto:keerthivasan98406@gmail.com"
                  style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  keerthivasan98406@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(6,182,212,0.08)', marginBottom: '1.5rem' }} />

        {/* Copyright */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {year} Keerthivasan A — Built with
          </span>
          <FiHeart size={13} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            using React & Node.js
          </span>
        </div>
      </div>
    </footer>
  );
}
