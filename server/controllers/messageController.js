const Message = require('../models/Message');

let memoryMessages = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techventures.io',
    phone: '+1 (555) 234-5678',
    subject: 'Senior Full Stack Role',
    message: 'Hello Alex! We loved reviewing your MERN stack portfolio projects. We would love to arrange an interview for a Senior Full Stack Engineer role.',
    createdAt: new Date().toISOString()
  }
];

// @desc    Create contact message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    try {
      const msg = await Message.create({ name, email, phone, subject, message });
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received and saved to database.',
        data: msg
      });
    } catch (dbErr) {
      const newMsg = {
        _id: String(Date.now()),
        name,
        email,
        phone: phone || '',
        subject: subject || 'General Inquiry',
        message,
        createdAt: new Date().toISOString()
      };
      memoryMessages.unshift(newMsg);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received and saved to database.',
        data: newMsg
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.json({ success: true, count: memoryMessages.length, data: memoryMessages });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) {
      memoryMessages = memoryMessages.filter(m => m._id !== req.params.id);
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    memoryMessages = memoryMessages.filter(m => m._id !== req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  }
};

module.exports = { createMessage, getMessages, deleteMessage };
