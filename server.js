const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'portfolio.db');

// Initialize Native SQLite Database
const db = new DatabaseSync(DB_PATH);

function initDatabase() {
  console.log('Initializing SQLite database schema via node:sqlite...');

  // Projects table
  db.exec(`
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
    );
  `);

  // Skills table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      proficiency INTEGER NOT NULL,
      icon TEXT
    );
  `);

  // Messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed initial data if projects table is empty
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM projects');
  const result = countStmt.get();

  if (result.count === 0) {
    seedData();
  }
}

function seedData() {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, description, category, tags, image, github_url, live_url, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProjects = [
    [
      'AI Smart Task Assistant',
      'An intelligent project management dashboard powered by NLP and predictive task scheduling. Built with React, Express, Node.js, and MongoDB.',
      'Full Stack',
      'React, Node.js, Express, MongoDB, OpenAI',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://github.com/example/ai-smart-task',
      'https://ai-smart-task.demo.app',
      1
    ],
    [
      'Real-Time Crypto & Stock Tracker',
      'Interactive financial platform displaying WebSocket live streaming tickers, technical indicators, and portfolio analytics.',
      'Frontend',
      'React, Vite, WebSockets, Chart.js, CSS3',
      'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
      'https://github.com/example/crypto-tracker',
      'https://crypto-tracker.demo.app',
      1
    ],
    [
      'DevNexus Cloud Microservice API',
      'Scalable microservices backend API supporting JWT auth, rate-limiting, and PostgreSQL & MongoDB dynamic database pooling.',
      'Backend',
      'Node.js, Express, MongoDB, Docker, Redis',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://github.com/example/devnexus-api',
      'https://api.devnexus.demo.app',
      1
    ],
    [
      'Automated E-Commerce Engine',
      'Full-stack online shopping platform with cart management, Stripe checkout integration, and real-time inventory synchronization.',
      'Full Stack',
      'React, Express, Node.js, MongoDB, Stripe',
      'https://images.unsplash.com/photo-1556742049-0a67daf64f42?auto=format&fit=crop&w=800&q=80',
      'https://github.com/example/ecommerce-engine',
      'https://shop.demo.app',
      1
    ]
  ];

  for (const proj of initialProjects) {
    insertProject.run(...proj);
  }

  const insertSkill = db.prepare(`
    INSERT INTO skills (name, category, proficiency, icon)
    VALUES (?, ?, ?, ?)
  `);

  const initialSkills = [
    ['HTML5', 'Frontend', 98, 'layout'],
    ['CSS3', 'Frontend', 95, 'layout'],
    ['JavaScript', 'Frontend', 94, 'code'],
    ['React', 'Frontend', 92, 'code'],
    ['Tailwind CSS', 'Frontend', 90, 'layout'],
    ['Node.js', 'Backend', 90, 'server'],
    ['Express.js', 'Backend', 92, 'cpu'],
    ['MongoDB', 'Database', 88, 'database'],
    ['MySQL', 'Database', 85, 'database'],
    ['Python', 'Programming', 88, 'code'],
    ['Java', 'Programming', 82, 'code'],
    ['Git', 'Tools', 92, 'git'],
    ['GitHub', 'Tools', 94, 'git'],
    ['VS Code', 'Tools', 96, 'code'],
    ['Postman', 'Tools', 90, 'globe']
  ];

  for (const skill of initialSkills) {
    insertSkill.run(...skill);
  }
}

// Initialize database schema
initDatabase();

// Helper to parse JSON request body
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', (err) => reject(err));
  });
}

// Helper for JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

// HTTP Server Router
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end();
    return;
  }

  // API ROUTING
  if (pathname.startsWith('/api')) {
    try {
      // POST /api/auth/login
      if (pathname === '/api/auth/login' && method === 'POST') {
        const body = await getRequestBody(req);
        const { username, password } = body;

        if ((username === 'admin' || username === 'alex') && (password === 'admin123' || password === 'admin')) {
          return sendJSON(res, 200, {
            success: true,
            message: 'Admin login successful',
            token: 'mock_jwt_token_alex_vance_2026',
            admin: { id: 1, username: 'admin' }
          });
        }
        return sendJSON(res, 401, { success: false, message: 'Invalid admin username or password' });
      }

      // GET /api/auth/me
      if (pathname === '/api/auth/me' && method === 'GET') {
        return sendJSON(res, 200, { success: true, admin: { id: 1, username: 'admin' } });
      }

      // GET /api/health
      if (pathname === '/api/health' && method === 'GET') {
        const projCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
        const msgCount = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;

        return sendJSON(res, 200, {
          status: 'online',
          engine: 'Node.js Full-Stack REST Engine + MERN Compatibility',
          uptime: process.uptime(),
          stats: { totalProjects: projCount, totalMessages: msgCount }
        });
      }

      // GET /api/projects
      if (pathname === '/api/projects' && method === 'GET') {
        const category = parsedUrl.searchParams.get('category');
        let stmt, rows;

        if (category && category !== 'All') {
          stmt = db.prepare('SELECT * FROM projects WHERE category = ? ORDER BY id DESC');
          rows = stmt.all(category);
        } else {
          stmt = db.prepare('SELECT * FROM projects ORDER BY id DESC');
          rows = stmt.all();
        }

        // Format row properties for MERN client compatibility
        const formatted = rows.map(r => ({
          _id: String(r.id),
          title: r.title,
          description: r.description,
          category: r.category,
          technologies: r.tags.split(',').map(t => t.trim()),
          image: r.image,
          github: r.github_url,
          liveDemo: r.live_url,
          createdAt: r.created_at
        }));

        return sendJSON(res, 200, { success: true, count: formatted.length, data: formatted });
      }

      // GET /api/projects/:id
      if (pathname.startsWith('/api/projects/') && method === 'GET') {
        const id = pathname.split('/')[3];
        const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
        if (!row) return sendJSON(res, 404, { success: false, message: 'Project not found' });
        
        return sendJSON(res, 200, {
          success: true,
          data: {
            _id: String(row.id),
            title: row.title,
            description: row.description,
            category: row.category,
            technologies: row.tags.split(',').map(t => t.trim()),
            image: row.image,
            github: row.github_url,
            liveDemo: row.live_url,
            createdAt: row.created_at
          }
        });
      }

      // POST /api/projects
      if (pathname === '/api/projects' && method === 'POST') {
        const body = await getRequestBody(req);
        const { title, description, category, technologies, image, github, liveDemo } = body;

        if (!title || !description) {
          return sendJSON(res, 400, { success: false, message: 'Title and description are required' });
        }

        const tagsStr = Array.isArray(technologies) ? technologies.join(', ') : (technologies || 'React, Express, Node.js');
        const defaultImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

        const stmt = db.prepare(`
          INSERT INTO projects (title, description, category, tags, image, github_url, live_url, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        `);
        const result = stmt.run(title, description, category || 'Full Stack', tagsStr, image || defaultImage, github || 'https://github.com', liveDemo || 'https://demo.app');

        const newId = Number(result.lastInsertRowid);
        return sendJSON(res, 201, {
          success: true,
          message: 'Project created successfully',
          data: {
            _id: String(newId),
            title,
            description,
            category: category || 'Full Stack',
            technologies: tagsStr.split(',').map(t => t.trim()),
            image: image || defaultImage,
            github: github || 'https://github.com',
            liveDemo: liveDemo || 'https://demo.app',
            createdAt: new Date().toISOString()
          }
        });
      }

      // PUT /api/projects/:id
      if (pathname.startsWith('/api/projects/') && method === 'PUT') {
        const id = pathname.split('/')[3];
        const body = await getRequestBody(req);
        const { title, description, category, technologies, image, github, liveDemo } = body;

        const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
        if (!existing) return sendJSON(res, 404, { success: false, message: 'Project not found' });

        const newTitle = title || existing.title;
        const newDesc = description || existing.description;
        const newCat = category || existing.category;
        const newTags = Array.isArray(technologies) ? technologies.join(', ') : (technologies || existing.tags);
        const newImg = image || existing.image;
        const newGit = github || existing.github_url;
        const newLive = liveDemo || existing.live_url;

        db.prepare(`
          UPDATE projects SET title = ?, description = ?, category = ?, tags = ?, image = ?, github_url = ?, live_url = ?
          WHERE id = ?
        `).run(newTitle, newDesc, newCat, newTags, newImg, newGit, newLive, id);

        return sendJSON(res, 200, {
          success: true,
          data: {
            _id: String(id),
            title: newTitle,
            description: newDesc,
            category: newCat,
            technologies: newTags.split(',').map(t => t.trim()),
            image: newImg,
            github: newGit,
            liveDemo: newLive
          }
        });
      }

      // DELETE /api/projects/:id
      if (pathname.startsWith('/api/projects/') && method === 'DELETE') {
        const id = pathname.split('/')[3];
        db.prepare('DELETE FROM projects WHERE id = ?').run(id);
        return sendJSON(res, 200, { success: true, message: `Project #${id} deleted` });
      }

      // GET /api/skills
      if (pathname === '/api/skills' && method === 'GET') {
        const rows = db.prepare('SELECT * FROM skills ORDER BY category, proficiency DESC').all();
        const formatted = rows.map(r => ({
          _id: String(r.id),
          name: r.name,
          percentage: r.proficiency,
          category: r.category,
          icon: r.icon
        }));
        return sendJSON(res, 200, { success: true, count: formatted.length, data: formatted });
      }

      // POST /api/skills
      if (pathname === '/api/skills' && method === 'POST') {
        const body = await getRequestBody(req);
        const { name, percentage, category } = body;

        if (!name || !category) {
          return sendJSON(res, 400, { success: false, message: 'Name and category are required' });
        }

        const stmt = db.prepare('INSERT INTO skills (name, category, proficiency, icon) VALUES (?, ?, ?, ?)');
        const result = stmt.run(name, category, percentage || 85, 'code');

        const newId = Number(result.lastInsertRowid);
        return sendJSON(res, 201, {
          success: true,
          data: { _id: String(newId), name, percentage: percentage || 85, category, icon: 'code' }
        });
      }

      // DELETE /api/skills/:id
      if (pathname.startsWith('/api/skills/') && method === 'DELETE') {
        const id = pathname.split('/')[3];
        db.prepare('DELETE FROM skills WHERE id = ?').run(id);
        return sendJSON(res, 200, { success: true, message: `Skill #${id} deleted` });
      }

      // POST /api/messages
      if ((pathname === '/api/messages' || pathname === '/api/contact') && method === 'POST') {
        const body = await getRequestBody(req);
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
          return sendJSON(res, 400, { success: false, message: 'Name, email, and message are required' });
        }

        const stmt = db.prepare('INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)');
        const result = stmt.run(name, email, phone || '', subject || 'General Inquiry', message);

        return sendJSON(res, 201, {
          success: true,
          message: 'Thank you! Your message has been received and saved.',
          data: { _id: String(result.lastInsertRowid), name, email, phone, subject, message }
        });
      }

      // GET /api/messages
      if ((pathname === '/api/messages' || pathname === '/api/contact') && method === 'GET') {
        const rows = db.prepare('SELECT * FROM messages ORDER BY id DESC').all();
        const formatted = rows.map(r => ({
          _id: String(r.id),
          name: r.name,
          email: r.email,
          phone: r.phone,
          subject: r.subject,
          message: r.message,
          createdAt: r.created_at
        }));
        return sendJSON(res, 200, { success: true, count: formatted.length, data: formatted });
      }

      // DELETE /api/messages/:id
      if (pathname.startsWith('/api/messages/') && method === 'DELETE') {
        const id = pathname.split('/')[3];
        db.prepare('DELETE FROM messages WHERE id = ?').run(id);
        return sendJSON(res, 200, { success: true, message: `Message #${id} deleted` });
      }

      // GET /api/stats
      if (pathname === '/api/stats' && method === 'GET') {
        const pCount = db.prepare('SELECT COUNT(*) as c FROM projects').get().c;
        const sCount = db.prepare('SELECT COUNT(*) as c FROM skills').get().c;
        const mCount = db.prepare('SELECT COUNT(*) as c FROM messages').get().c;

        return sendJSON(res, 200, {
          success: true,
          data: { projectsCount: pCount, skillsCount: sCount, messagesCount: mCount }
        });
      }

      return sendJSON(res, 404, { success: false, message: 'API Route Not Found' });
    } catch (err) {
      console.error('API Error:', err);
      return sendJSON(res, 500, { success: false, message: err.message });
    }
  }

  // STATIC FILE SERVING
  let filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);

  if (!filePath.startsWith(path.join(__dirname, 'public'))) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'public', 'index.html'), (idxErr, idxContent) => {
        if (idxErr) {
          res.writeHead(404);
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(idxContent, 'utf-8');
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Production Ready MERN Portfolio Application Server Live!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`⚡ API Routes: /api/auth/login, /api/projects, /api/skills, /api/messages`);
  console.log(`💾 Database: SQLite (via native node:sqlite engine)\n`);
});
