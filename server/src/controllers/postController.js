// server/src/controllers/postController.js

const Post = require('../models/Post');
const User = require('../models/User'); // We may need this, but Post is essential
const { validationResult } = require('express-validator'); // Good for validation, but let's do manual for now.

// --- 1. Create a Post ---
// @route   POST /api/posts
exports.createPost = async (req, res, next) => {
  // Check for validation errors (from express-validator, if we add it)
  // For now, mongoose model validation will handle it
  const { title, content, category } = req.body;

  try {
    // Basic validation check (matches the 400 test)
    if (!title || !content || !category) {
      const error = new Error('Missing required fields: title, content, and category');
      error.statusCode = 400;
      return next(error);
    }

    const post = new Post({
      title,
      content,
      category,
      author: req.user.id, // We get this from the 'protect' middleware
    });

    const newPost = await post.save();
    res.status(201).json(newPost); // 201 = Created
  } catch (err) {
    // Pass to global error handler
    next(err);
  }
};

// --- 2. Get All Posts ---
// @route   GET /api/posts
exports.getAllPosts = async (req, res, next) => {
  try {
    // --- Filtering (for the category test) ---
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // --- Pagination (for the pagination test) ---
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10; // Default 10 per page
    const skip = (page - 1) * limit;

    const posts = await Post.find(filter)
      .populate('author', 'username') // Show author's username
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);
    
    // We could also send back total pages, etc.
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

// --- 3. Get Single Post by ID ---
// @route   GET /api/posts/:id
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');

    if (!post) {
      // This matches the 404 test
      const error = new Error('Post not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json(post);
  } catch (err) {
    // Handles malformed IDs, etc.
    next(err);
  }
};

// --- 4. Update a Post ---
// @route   PUT /api/posts/:id
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      return next(error);
    }

    // --- Authorization Check (for the 403 test) ---
    // Check if the user trying to update is the author
    if (post.author.toString() !== req.user.id) {
      const error = new Error('User not authorized to update this post');
      error.statusCode = 403; // 403 = Forbidden
      return next(error);
    }

    // Update the fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;
    // The slug will auto-update if the title changes (from our model)

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// --- 5. Delete a Post ---
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      return next(error);
    }

    // --- Authorization Check (for the 403 test) ---
    if (post.author.toString() !== req.user.id) {
      const error = new Error('User not authorized to delete this post');
      error.statusCode = 403; // 403 = Forbidden
      return next(error);
    }

    await post.deleteOne(); // Use deleteOne()
    res.status(200).json({ success: true, message: 'Post removed' });
  } catch (err) {
    next(err);
  }
};