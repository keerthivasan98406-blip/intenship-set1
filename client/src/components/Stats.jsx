import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: 3, suffix: '+', label: 'Years Experience' },
  { number: 10, suffix: '+', label: 'Projects Built' },
  { number: 15, suffix: '+', label: 'Technologies' },
  { number: 100, suffix: '%', label: 'Dedication' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref} style={{
      fontFamily: 'var(--font-heading)',
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#fff',
    }}>
      <span style={{ color: 'var(--accent-cyan)' }}>{count}{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section style={{
      padding: '4rem 0',
      background: 'rgba(6,182,212,0.03)',
      borderTop: '1px solid rgba(6,182,212,0.08)',
      borderBottom: '1px solid rgba(6,182,212,0.08)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Counter target={stat.number} suffix={stat.suffix} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
