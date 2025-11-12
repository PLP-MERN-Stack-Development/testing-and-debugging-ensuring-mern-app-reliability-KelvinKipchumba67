// server/src/models/Post.js

const mongoose = require('mongoose');
const slug = require('slug'); // Import the slug package

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates the relationship to the User model
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // We'll assume a Category model exists
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt

// --- Mongoose Middleware ---
// Generate slug before saving
PostSchema.pre('save', function (next) {
  // Only generate a slug if the post is new or the title has changed
  if (this.isNew || this.isModified('title')) {
    this.slug = slug(this.title);
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);