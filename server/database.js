const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'portfolio.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initTables();
  }
});

function initTables() {
  db.serialize(() => {
    // Projects Table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        tags TEXT NOT NULL,
        image TEXT NOT NULL,
        github_url TEXT,
        live_url TEXT,
        featured INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Skills Table
    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        proficiency INTEGER NOT NULL,
        icon TEXT
      )
    `);

    // Contact Messages Table
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default data if empty
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
      if (err) return;
      if (row.count === 0) {
        seedInitialData();
      }
    });
  });
}

function seedInitialData() {
  console.log('Seeding initial portfolio data into SQLite database...');

  const initialProjects = [
    {
      title: 'AI Smart Task Assistant',
      description: 'An intelligent project management dashboard powered by NLP and predictive task scheduling. Built with React, Express, Node.js, and SQLite.',
      category: 'Full Stack',
      tags: 'React, Node.js, Express, SQLite, OpenAI',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/example/ai-smart-task',
      live_url: 'https://ai-smart-task.demo.app',
      featured: 1
    },
    {
      title: 'Real-Time Crypto & Stock Tracker',
      description: 'Interactive financial platform displaying WebSocket live streaming tickers, technical indicators, and portfolio analytics.',
      category: 'Frontend',
      tags: 'React, Vite, WebSockets, Chart.js, Tailwind',
      image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/example/crypto-tracker',
      live_url: 'https://crypto-tracker.demo.app',
      featured: 1
    },
    {
      title: 'DevNexus Cloud Microservice API',
      description: 'Scalable microservices backend API supporting JWT auth, rate-limiting, and PostgreSQL & SQLite dynamic database pooling.',
      category: 'Backend',
      tags: 'Node.js, Express, SQLite, Docker, Redis',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/example/devnexus-api',
      live_url: 'https://api.devnexus.demo.app',
      featured: 1
    },
    {
      title: 'Subtle Glassmorphic Portfolio Template',
      description: 'A modern, ultra-responsive web application theme built with CSS design tokens, smooth animations, and accessibility features.',
      category: 'Frontend',
      tags: 'HTML5, CSS3, JavaScript, Responsive',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/example/glassmorphic-portfolio',
      live_url: 'https://glassmorphic.demo.app',
      featured: 0
    },
    {
      title: 'Automated E-Commerce Engine',
      description: 'Full-stack online shopping platform with cart management, Stripe checkout integration, and real-time inventory synchronization.',
      category: 'Full Stack',
      tags: 'React, Express, Node.js, MongoDB, Stripe',
      image: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/example/ecommerce-engine',
      live_url: 'https://shop.demo.app',
      featured: 1
    }
  ];

  const stmtProj = db.prepare(`
    INSERT INTO projects (title, description, category, tags, image, github_url, live_url, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  initialProjects.forEach(p => {
    stmtProj.run(p.title, p.description, p.category, p.tags, p.image, p.github_url, p.live_url, p.featured);
  });
  stmtProj.finalize();

  const initialSkills = [
    { name: 'React.js', category: 'Frontend', proficiency: 92, icon: 'code' },
    { name: 'JavaScript / ES6+', category: 'Frontend', proficiency: 95, icon: 'file-code' },
    { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 98, icon: 'layout' },
    { name: 'Node.js', category: 'Backend', proficiency: 90, icon: 'server' },
    { name: 'Express.js', category: 'Backend', proficiency: 92, icon: 'cpu' },
    { name: 'RESTful APIs', category: 'Backend', proficiency: 94, icon: 'globe' },
    { name: 'SQLite / SQL', category: 'Database', proficiency: 88, icon: 'database' },
    { name: 'MongoDB', category: 'Database', proficiency: 85, icon: 'hard-drive' },
    { name: 'Git & GitHub', category: 'Tools', proficiency: 90, icon: 'git-branch' },
    { name: 'Vite / Webpack', category: 'Tools', proficiency: 86, icon: 'zap' }
  ];

  const stmtSkill = db.prepare(`
    INSERT INTO skills (name, category, proficiency, icon)
    VALUES (?, ?, ?, ?)
  `);

  initialSkills.forEach(s => {
    stmtSkill.run(s.name, s.category, s.proficiency, s.icon);
  });
  stmtSkill.finalize();

  // Add initial contact message example
  db.run(`
    INSERT INTO messages (name, email, subject, message)
    VALUES ('Alex Morgan', 'alex@techventures.io', 'Project Collaboration', 'Hi! I love your portfolio projects. We would love to discuss a potential full-stack contract role.')
  `);
}

module.exports = db;
