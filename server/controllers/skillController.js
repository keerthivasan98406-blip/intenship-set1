const Skill = require('../models/Skill');

let memorySkills = [
  { _id: '1', name: 'HTML5', percentage: 98, category: 'Frontend', icon: 'html5' },
  { _id: '2', name: 'CSS3', percentage: 95, category: 'Frontend', icon: 'css3' },
  { _id: '3', name: 'JavaScript (ES6+)', percentage: 94, category: 'Frontend', icon: 'javascript' },
  { _id: '4', name: 'React.js', percentage: 92, category: 'Frontend', icon: 'react' },
  { _id: '5', name: 'Tailwind CSS', percentage: 90, category: 'Frontend', icon: 'tailwind' },
  { _id: '6', name: 'Node.js', percentage: 90, category: 'Backend', icon: 'nodejs' },
  { _id: '7', name: 'Express.js', percentage: 92, category: 'Backend', icon: 'express' },
  { _id: '8', name: 'MongoDB', percentage: 88, category: 'Database', icon: 'mongodb' },
  { _id: '9', name: 'MySQL', percentage: 85, category: 'Database', icon: 'mysql' },
  { _id: '10', name: 'Python', percentage: 88, category: 'Programming', icon: 'python' },
  { _id: '11', name: 'Java', percentage: 82, category: 'Programming', icon: 'java' },
  { _id: '12', name: 'Git & GitHub', percentage: 92, category: 'Tools', icon: 'git' },
  { _id: '13', name: 'VS Code', percentage: 95, category: 'Tools', icon: 'vscode' },
  { _id: '14', name: 'Postman', percentage: 90, category: 'Tools', icon: 'postman' }
];

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, percentage: -1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.json({ success: true, count: memorySkills.length, data: memorySkills });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, percentage, category, icon } = req.body;
    try {
      const skill = await Skill.create({ name, percentage, category, icon });
      return res.status(201).json({ success: true, data: skill });
    } catch (dbErr) {
      const newSkill = { _id: String(Date.now()), name, percentage, category, icon: icon || 'code' };
      memorySkills.push(newSkill);
      return res.status(201).json({ success: true, data: newSkill });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) {
      const idx = memorySkills.findIndex(s => s._id === req.params.id);
      if (idx !== -1) {
        memorySkills[idx] = { ...memorySkills[idx], ...req.body };
        return res.json({ success: true, data: memorySkills[idx] });
      }
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      memorySkills = memorySkills.filter(s => s._id !== req.params.id);
    }
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    memorySkills = memorySkills.filter(s => s._id !== req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
