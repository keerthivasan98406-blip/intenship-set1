import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const links = [
    { name: 'Home',     path: '/' },
    { name: 'About',    path: '/about' },
    { name: 'Skills',   path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact',  path: '/contact' },
  ];

  return (
    <>
      {/* Progress bar */}
      <div style={{
        position:'fixed',top:0,left:0,height:'1px',
        width:`${progress}%`,
        background:'linear-gradient(90deg,#2563eb,#06b6d4)',
        zIndex:9999,transition:'width 0.1s linear',
      }}/>

      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        padding: scrolled ? '0.75rem 0' : '1.1rem 0',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition:'all 0.3s ease',
      }}>
        <div style={{
          maxWidth:'1100px',margin:'0 auto',padding:'0 1.5rem',
          display:'flex',alignItems:'center',justifyContent:'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{display:'flex',alignItems:'center',gap:'0.6rem',textDecoration:'none'}}>
            <div style={{
              width:'32px',height:'32px',borderRadius:'8px',
              background:'linear-gradient(135deg,#2563eb,#06b6d4)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:900,color:'#fff',fontSize:'0.95rem',letterSpacing:'-0.05em',
            }}>K</div>
            <span style={{fontWeight:700,fontSize:'1.05rem',color:'#fff',letterSpacing:'-0.02em'}}>
              Keerthivasan
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{display:'flex',gap:'2rem'}} className="nav-desktop">
            {links.map(l => {
              const active = location.pathname === l.path;
              return (
                <Link key={l.name} to={l.path} style={{
                  textDecoration:'none',
                  fontSize:'0.88rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#fff' : 'var(--text-2)',
                  transition:'color 0.2s',
                  position:'relative',
                }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => { if(!active) e.currentTarget.style.color='var(--text-2)'; }}
                >
                  {l.name}
                  {active && (
                    <motion.div layoutId="nav-dot" style={{
                      position:'absolute',bottom:'-4px',left:'50%',transform:'translateX(-50%)',
                      width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)',
                    }}/>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}} className="nav-desktop">
            <a href="/contact" style={{
              display:'inline-flex',alignItems:'center',gap:'0.4rem',
              padding:'0.5rem 1.2rem',borderRadius:'var(--radius-full)',
              background:'var(--text-1)',color:'var(--bg)',
              fontWeight:600,fontSize:'0.85rem',textDecoration:'none',
              transition:'var(--transition)',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='#e4e4e7'}
              onMouseLeave={e=>e.currentTarget.style.background='var(--text-1)'}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={()=>setMobileOpen(v=>!v)}
            style={{background:'none',border:'none',color:'#fff',cursor:'pointer',padding:'4px',display:'none'}}
            className="nav-mobile"
          >
            {mobileOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              style={{
                background:'rgba(0,0,0,0.97)',
                borderTop:'1px solid rgba(255,255,255,0.06)',
                padding:'1.5rem',
              }}
            >
              {links.map(l=>(
                <Link key={l.name} to={l.path}
                  style={{
                    display:'block',padding:'0.75rem 0',
                    color: location.pathname===l.path ? '#fff':'var(--text-2)',
                    textDecoration:'none',fontSize:'1rem',fontWeight:500,
                    borderBottom:'1px solid rgba(255,255,255,0.04)',
                  }}
                >{l.name}</Link>
              ))}
              <a href="/contact" style={{
                display:'inline-flex',marginTop:'1.25rem',
                padding:'0.65rem 1.5rem',borderRadius:'var(--radius-full)',
                background:'#fff',color:'#000',fontWeight:600,fontSize:'0.9rem',textDecoration:'none',
              }}>Hire Me</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media(max-width:768px){
          .nav-desktop{display:none!important;}
          .nav-mobile{display:block!important;}
        }
      `}</style>
    </>
  );
}
