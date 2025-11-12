// server/src/server.js

const mongoose = require('mongoose');
const app = require('./app'); // Import our app

// --- DATABASE CONNECTION ---
// We'll add this properly with a .env file later
const MONGO_URI = 'mongodb://127.0.0.1:27017/my-mern-app';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    
    // Start the server *after* the DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });