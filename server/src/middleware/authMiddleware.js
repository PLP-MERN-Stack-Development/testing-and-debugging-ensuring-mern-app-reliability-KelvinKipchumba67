// server/src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/auth');

/**
 * Protects routes by verifying JWT
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check if the auth header exists and is a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from the token's ID and attach it to the req object
      // We exclude the password when fetching the user
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
         return res.status(401).json({ error: 'Not authorized, user not found' });
      }

      next(); // Move to the next middleware/controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};