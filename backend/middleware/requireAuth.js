// middleware/requireAuth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const JWT_SECRET = process.env.JWT_SECRET;

const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. No token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is invalid or expired.' });
  }
};

module.exports = requireAuth;
