const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a skill name'],
      trim: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
      default: 85,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Programming', 'Tools'],
      required: true,
    },
    icon: {
      type: String,
      default: 'code',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', SkillSchema);
