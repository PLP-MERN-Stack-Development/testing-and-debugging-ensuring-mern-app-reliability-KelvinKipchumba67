// server/src/routes/posts.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// create these controller functions in the next step
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', protect, createPost);

// @route   GET /api/posts
// @desc    Get all posts (with filtering/pagination)
// @access  Public
router.get('/', getAllPosts);

// @route   GET /api/posts/:id
// @desc    Get a single post by its ID
// @access  Public
router.get('/:id', getPostById);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private (only the author)
router.put('/:id', protect, updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private (only the author)
router.delete('/:id', protect, deletePost);

module.exports = router;