const { useState, useEffect } = React;

// API Helper Service
const api = {
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      return await res.json();
    } catch (e) {
      return { status: 'offline' };
    }
  },
  async getProjects(cat = 'All') {
    const url = cat && cat !== 'All' ? `/api/projects?category=${encodeURIComponent(cat)}` : '/api/projects';
    const res = await fetch(url);
    return await res.json();
  },
  async createProject(data) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async deleteProject(id) {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    return await res.json();
  },
  async getSkills() {
    const res = await fetch('/api/skills');
    return await res.json();
  },
  async submitContact(data) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  async getMessages() {
    const res = await fetch('/api/messages');
    return await res.json();
  },
  async getStats() {
    const res = await fetch('/api/stats');
    return await res.json();
  }
};

// NAVBAR COMPONENT
function Navbar({ theme, toggleTheme, onOpenAdmin }) {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    const res = await api.getHealth();
    setApiStatus(res.status === 'online' ? 'online' : 'offline');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '1rem 0', background: 'var(--bg-card)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px', background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold'
          }}>⚡</div>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
            Keerthi<span className="gradient-text">.dev</span>
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="#hero" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>About</a>
          <a href="#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Projects</a>
          <a href="#skills" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Skills</a>
          <a href="#timeline" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Experience</a>
          <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>Contact</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600',
            background: apiStatus === 'online' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${apiStatus === 'online' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: apiStatus === 'online' ? '#10b981' : '#ef4444'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: apiStatus === 'online' ? '#10b981' : '#ef4444' }}></span>
            <span>{apiStatus === 'online' ? 'SQLite Engine' : 'Offline'}</span>
          </div>

          <button onClick={onOpenAdmin} className="btn btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
            🛡️ Admin DB
          </button>

          <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', borderRadius: '50%' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

// HERO COMPONENT
function Hero() {
  const roles = ['Full-Stack Developer', 'Node.js & Express Architect', 'React & Frontend Craftsman', 'SQLite Database Specialist'];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(prev => (prev + 1) % roles.length), 3000);
    return () => clearInterval(t);
  }, []);

  const snippet = `// Full-Stack Portfolio Architecture
import { NodeHTTP } from 'node:http';
import { DatabaseSync } from 'node:sqlite';

const developer = {
  name: "Keerthivasan A",
  role: "${roles[roleIdx]}",
  stack: ["React.js", "Express API", "SQLite Database"],
  status: "Available for Hire 🚀"
};

console.log("Ready to build live full-stack apps!");`;

  return (
    <section id="hero" style={{ paddingTop: '8.5rem', paddingBottom: '5rem', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div className="section-tag">✨ Available for Hire</div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', marginBottom: '1rem', lineHeight: '1.15' }}>
              Hi, I'm <span className="gradient-text">Keerthivasan A</span>. <br />
              <span style={{ fontSize: '70%', color: 'var(--text-primary)' }}>{roles[roleIdx]}</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '520px' }}>
              I build robust full-stack web applications featuring interactive React frontends, high-performance Express-compatible REST APIs, and native SQLite database persistence.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#projects" className="btn btn-primary">Explore Projects &rarr;</a>
              <a href="#contact" className="btn btn-secondary">Get in Touch</a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            {/* Profile Image Badge */}
            <div style={{
              position: 'relative', width: '190px', height: '190px', borderRadius: '50%',
              padding: '4px', background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
              boxShadow: '0 0 35px rgba(6,182,212,0.35)',
            }}>
              <img
                src="/profile.png"
                alt="Keerthivasan A"
                style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  objectFit: 'cover', objectPosition: 'center top', display: 'block',
                  background: '#0a0a0a',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', width: '100%' }}>
              <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-glass)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', marginRight: '6px' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', marginRight: '6px' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', marginRight: '12px' }}></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>server.architecture.ts</span>
              </div>
              <pre style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', overflowX: 'auto', margin: 0 }}>
                <code>{snippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// STATS COMPONENT
function Stats() {
  const [stats, setStats] = useState({ projectsCount: 5, skillsCount: 10, messagesCount: 1 });

  useEffect(() => {
    api.getStats().then(res => {
      if (res.data) setStats(res.data);
    });
  }, []);

  return (
    <section style={{ padding: '1.5rem 0' }}>
      <div className="container">
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', padding: '2rem' }}>
          <div>
            <h3 className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.projectsCount}+</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Projects Built & Live</p>
          </div>
          <div>
            <h3 className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.skillsCount}+</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mastered Technologies</p>
          </div>
          <div>
            <h3 className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.messagesCount}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>SQLite Client Messages</p>
          </div>
          <div>
            <h3 className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800' }}>3+ Yrs</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full-Stack Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// PROJECTS COMPONENT
function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProj, setSelectedProj] = useState(null);

  useEffect(() => {
    api.getProjects(activeCategory).then(res => {
      if (res.data) setProjects(res.data);
    });
  }, [activeCategory]);

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">📁 Portfolio Works</div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">Projects loaded dynamically from SQLite database API.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--bg-card)', padding: '0.3rem', borderRadius: 'var(--radius-full)' }}>
            {['All', 'Full Stack', 'Frontend', 'Backend'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-full)', border: 'none',
                  cursor: 'pointer', fontWeight: '600', fontSize: '0.88rem',
                  background: activeCategory === cat ? 'var(--gradient-primary)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-full)',
              background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)', outline: 'none', width: '240px'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {filtered.map(p => (
            <div key={p.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)', fontWeight: '600' }}>{p.category}</span>
                <h3 style={{ fontSize: '1.2rem', margin: '0.4rem 0' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem', flexGrow: 1 }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                  {p.tags.split(',').map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', background: 'var(--bg-glass)', borderRadius: '4px', color: 'var(--text-muted)' }}>{t.trim()}</span>
                  ))}
                </div>
                <button onClick={() => setSelectedProj(p)} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        {selectedProj && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} onClick={() => setSelectedProj(null)}>
            <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '2rem' }} onClick={e => e.stopPropagation()}>
              <img src={selectedProj.image} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
              <h3>{selectedProj.title}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>{selectedProj.description}</p>
              <button onClick={() => setSelectedProj(null)} className="btn btn-primary">Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// SKILLS COMPONENT
function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.getSkills().then(res => {
      if (res.data) setSkills(res.data);
    });
  }, []);

  const groups = ['Frontend', 'Backend', 'Database', 'Tools'];

  return (
    <section id="skills" className="section-padding" style={{ background: 'rgba(0,0,0,0.15)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">⚡ Mastery</div>
          <h2 className="section-title">Skills & <span className="gradient-text">Technologies</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {groups.map(g => (
            <div key={g} className="glass-card" style={{ padding: '1.8rem' }}>
              <h3 style={{ marginBottom: '1.2rem' }}>{g}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {skills.filter(s => s.category === g).map(s => (
                  <div key={s.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                      <span>{s.name}</span>
                      <span style={{ color: 'var(--accent-indigo)', fontWeight: 'bold' }}>{s.proficiency}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.proficiency}%`, height: '100%', background: 'var(--gradient-primary)' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// TIMELINE COMPONENT
function Timeline() {
  const items = [
    { role: 'Full-Stack Software Engineer', org: 'TechVentures Studio', period: '2024 — Present', desc: 'Architecting React & Node.js web applications backed by SQLite database REST APIs.' },
    { role: 'Frontend Developer', org: 'Innovate Agency', period: '2023 — 2024', desc: 'Built high-conversion web UI landing pages with custom animations and responsive designs.' },
    { role: 'B.S. Computer Science', org: 'State Tech University', period: '2019 — 2023', desc: 'Specialized in Software Engineering, Web Technologies, and Database Management.' }
  ];

  return (
    <section id="timeline" className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">🎓 Journey</div>
          <h2 className="section-title">Experience & <span className="gradient-text">Education</span></h2>
        </div>

        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {items.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem' }}>{item.role}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontFamily: 'var(--font-mono)' }}>{item.period}</span>
              </div>
              <p style={{ color: 'var(--accent-purple)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.6rem' }}>{item.org}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CONTACT COMPONENT
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.submitContact(form);
    if (res.success) {
      setMsg('Thank you! Your message was saved into SQLite database.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'rgba(0,0,0,0.15)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">✉️ Contact</div>
          <h2 className="section-title">Let's Work <span className="gradient-text">Together</span></h2>
        </div>

        <div style={{ maxWidth: '650px', margin: '0 auto' }} className="glass-card">
          <div style={{ padding: '2rem' }}>
            {msg && <div style={{ padding: '0.8rem', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '8px', marginBottom: '1rem' }}>{msg}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ padding: '0.75rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: '#fff', borderRadius: '8px' }} />
              <input type="email" placeholder="Your Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ padding: '0.75rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: '#fff', borderRadius: '8px' }} />
              <input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{ padding: '0.75rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: '#fff', borderRadius: '8px' }} />
              <textarea placeholder="Message" rows="4" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ padding: '0.75rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: '#fff', borderRadius: '8px' }}></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ADMIN MODAL COMPONENT
function AdminModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('add');
  const [projForm, setProjForm] = useState({ title: '', description: '', category: 'Full Stack', tags: '', image: '' });
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isOpen && tab === 'msg') {
      api.getMessages().then(res => {
        if (res.data) setMessages(res.data);
      });
    }
  }, [isOpen, tab]);

  const handleAddProj = async (e) => {
    e.preventDefault();
    const res = await api.createProject(projForm);
    if (res.success) {
      setStatus('Project saved to SQLite database!');
      setProjForm({ title: '', description: '', category: 'Full Stack', tags: '', image: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div className="glass-card" style={{ maxWidth: '750px', width: '100%', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3>🛡️ SQLite Database Admin Portal</h3>
          <button onClick={onClose} className="btn btn-outline" style={{ padding: '0.2rem 0.6rem' }}>X</button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button onClick={() => setTab('add')} className={`btn ${tab === 'add' ? 'btn-primary' : 'btn-secondary'}`}>Add Project</button>
          <button onClick={() => setTab('msg')} className={`btn ${tab === 'msg' ? 'btn-primary' : 'btn-secondary'}`}>View Messages</button>
        </div>

        {status && <p style={{ color: '#10b981', marginBottom: '1rem' }}>{status}</p>}

        {tab === 'add' ? (
          <form onSubmit={handleAddProj} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <input type="text" placeholder="Project Title" required value={projForm.title} onChange={e => setProjForm({...projForm, title: e.target.value})} style={{ padding: '0.6rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: '#fff' }} />
            <select value={projForm.category} onChange={e => setProjForm({...projForm, category: e.target.value})} style={{ padding: '0.6rem', background: 'var(--bg-secondary)', color: '#fff' }}>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
            <textarea placeholder="Description" required rows="3" value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})} style={{ padding: '0.6rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: '#fff' }}></textarea>
            <button type="submit" className="btn btn-primary">Save to Database</button>
          </form>
        ) : (
          <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {messages.map(m => (
              <div key={m.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', marginBottom: '0.5rem' }}>
                <strong>{m.name}</strong> ({m.email})
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// MAIN APP COMPONENT
function App() {
  const [theme, setTheme] = useState('dark');
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <Navbar theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
      <footer style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border-glass)' }}>
        <p>© {new Date().getFullYear()} Alex Vance. Built with React & Node.js native SQLite database.</p>
      </footer>
    </div>
  );
}

// Render React App into #root
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
