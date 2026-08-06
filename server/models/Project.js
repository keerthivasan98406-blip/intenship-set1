const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    technologies: {
      type: [String],
      required: true,
      default: ['React', 'Node.js', 'Express', 'MongoDB'],
    },
    github: {
      type: String,
      default: 'https://github.com',
    },
    liveDemo: {
      type: String,
      default: 'https://demo.app',
    },
    category: {
      type: String,
      enum: ['Full Stack', 'Frontend', 'Backend', 'AI/ML', 'Mobile'],
      default: 'Full Stack',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
