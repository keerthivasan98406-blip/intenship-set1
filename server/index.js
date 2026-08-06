const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'keerthivasan_portfolio_jwt_secret_2024';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/keerthivasan_portfolio';

// ── Middleware ────────────────────────────────
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── MongoDB Connection ────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedAdminIfNeeded();
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ── Models ────────────────────────────────────
const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true, default: 'Full Stack' },
  tags:        { type: [String], default: [] },
  image:       { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  featured:    { type: Boolean, default: false },
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, required: true },
  proficiency: { type: Number, default: 80 },
  icon:        { type: String, default: '' },
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, default: '' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email:        { type: String, default: '' },
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
const Skill   = mongoose.model('Skill', SkillSchema);
const Message = mongoose.model('Message', MessageSchema);
const Admin   = mongoose.model('Admin', AdminSchema);

// ── Seed Admin ────────────────────────────────
async function seedAdminIfNeeded() {
  const count = await Admin.countDocuments();
  if (count === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin', passwordHash: hash, email: 'keerthivasan98406@gmail.com' });
    console.log('✅ Default admin created: admin / admin123');
  }
}

// ── Auth Middleware ───────────────────────────
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// ══════════════════════════════════════════════
// ── Auth Routes ───────────────────────────────
// ══════════════════════════════════════════════

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, admin: { username: admin.username, email: admin.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-passwordHash');
  res.json({ success: true, admin });
});

// ══════════════════════════════════════════════
// ── Projects Routes ───────────────────────────
// ══════════════════════════════════════════════

app.get('/api/projects', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ══════════════════════════════════════════════
// ── Skills Routes ─────────────────────────────
// ══════════════════════════════════════════════

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
    res.json({ success: true, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/skills', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/skills/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.delete('/api/skills/:id', authMiddleware, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ══════════════════════════════════════════════
// ── Contact / Messages Routes ─────────────────
// ══════════════════════════════════════════════

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }
    const msg = await Message.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/messages', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Health Check ──────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const [projects, skills, messages] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Message.countDocuments(),
    ]);
    res.json({
      status: 'online',
      database: 'MongoDB',
      uptime: process.uptime(),
      stats: { projects, skills, messages },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API Server running on http://localhost:${PORT}`);
});
