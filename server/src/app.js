// server/src/app.js

const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const postRoutes = require('./routes/posts');


// Middleware to parse JSON bodies
app.use(express.json());


// Tell Express to use your post routes
app.use('/api/posts', postRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

// Export the app for testing
module.exports = app;