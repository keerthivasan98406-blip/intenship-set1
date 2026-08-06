const Project = require('../models/Project');

// Initial seed array fallback
let memoryProjects = [
  {
    _id: '1',
    title: 'AI Smart Task Assistant',
    description: 'An intelligent project management dashboard powered by NLP and predictive task scheduling. Built with React, Express, Node.js, and MongoDB.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/example/ai-smart-task',
    liveDemo: 'https://ai-smart-task.demo.app',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Real-Time Crypto & Stock Tracker',
    description: 'Interactive financial platform displaying WebSocket live streaming tickers, technical indicators, and portfolio analytics.',
    category: 'Frontend',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/example/crypto-tracker',
    liveDemo: 'https://crypto-tracker.demo.app',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'DevNexus Cloud Microservice API',
    description: 'Scalable microservices backend API supporting JWT auth, rate-limiting, and PostgreSQL & MongoDB dynamic database pooling.',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Redis'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/example/devnexus-api',
    liveDemo: 'https://api.devnexus.demo.app',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Automated E-Commerce Engine',
    description: 'Full-stack online shopping platform with cart management, Stripe checkout integration, and real-time inventory synchronization.',
    category: 'Full Stack',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/example/ecommerce-engine',
    liveDemo: 'https://shop.demo.app',
    createdAt: new Date().toISOString()
  }
];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.json({ success: true, count: memoryProjects.length, data: memoryProjects });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const memProj = memoryProjects.find(p => p._id === req.params.id);
      if (memProj) return res.json({ success: true, data: memProj });
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    const memProj = memoryProjects.find(p => p._id === req.params.id);
    if (memProj) return res.json({ success: true, data: memProj });
    res.status(404).json({ success: false, message: 'Project not found' });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, github, liveDemo, category, image } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    try {
      const project = await Project.create({
        title,
        description,
        technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()),
        github,
        liveDemo,
        category: category || 'Full Stack',
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      });
      return res.status(201).json({ success: true, data: project });
    } catch (dbErr) {
      const newProj = {
        _id: String(Date.now()),
        title,
        description,
        technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()),
        github: github || 'https://github.com',
        liveDemo: liveDemo || 'https://demo.app',
        category: category || 'Full Stack',
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        createdAt: new Date().toISOString()
      };
      memoryProjects.unshift(newProj);
      return res.status(201).json({ success: true, data: newProj });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      const idx = memoryProjects.findIndex(p => p._id === req.params.id);
      if (idx !== -1) {
        memoryProjects[idx] = { ...memoryProjects[idx], ...req.body };
        return res.json({ success: true, data: memoryProjects[idx] });
      }
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      memoryProjects = memoryProjects.filter(p => p._id !== req.params.id);
      return res.json({ success: true, message: 'Project removed successfully' });
    }

    await project.deleteOne();
    res.json({ success: true, message: 'Project removed successfully' });
  } catch (error) {
    memoryProjects = memoryProjects.filter(p => p._id !== req.params.id);
    res.json({ success: true, message: 'Project removed successfully' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
