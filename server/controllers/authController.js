const jwt = require('jsonwebtoken');

// Generate JWT token helper
const generateToken = (id, username) => {
  return jwt.sign(
    { id, username },
    process.env.JWT_SECRET || 'mern_portfolio_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === validUsername && password === validPassword) {
    const token = generateToken(1, username);
    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: { id: 1, username }
    });
  }

  res.status(401).json({ success: false, message: 'Invalid admin username or password' });
};

// @desc    Get Current Admin User
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
};

module.exports = { login, getMe };
