const express = require('express');
const postController = require('../controllers/PostController');

const router = express.Router();

// GET /post/top-posts
router.get('/top-posts', postController.getTopCommentPosts);

module.exports = router;
