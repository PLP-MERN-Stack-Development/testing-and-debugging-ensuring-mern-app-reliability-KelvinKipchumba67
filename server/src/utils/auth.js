// server/src/utils/auth.js

const jwt = require('jsonwebtoken');

// A simple (but not production-ready) secret.
// In a real app, this MUST be in a .env file.
const JWT_SECRET = 'your_jwt_secret_key_12345';

/**
 * Generates a JWT for a user
 * @param {object} user - The user object (must have _id)
 */
const generateToken = (user) => {
  if (!user || !user._id) {
    throw new Error('Invalid user object for token generation');
  }

  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '1d' } // Token expires in 1 day
  );
};

module.exports = {
  generateToken,
  JWT_SECRET, // We might need this later
};