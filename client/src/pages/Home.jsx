import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';

// Lazy load heavy sections
const Stats = lazy(() => import('../components/Stats'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

function SectionLoader() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      padding: '4rem 0', color: 'var(--text-muted)',
    }}>
      <div style={{
        width: '32px', height: '32px',
        border: '3px solid rgba(6,182,212,0.15)',
        borderTopColor: 'var(--accent-cyan)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
}
