const express = require('express');
const { deleteBlog, createBlog, getUserBlogs, getAllBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/create', authMiddleware, upload.single('image'), createBlog);
router.get('/user', authMiddleware, getUserBlogs);
router.get('/all', getAllBlogs);
router.delete('/:id', authMiddleware ,deleteBlog)

module.exports = router;