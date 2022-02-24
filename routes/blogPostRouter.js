const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const blogPostController = require('../controllers/blogPostController');

router.post('/', authMiddleware, blogPostController.create);
router.get('/', authMiddleware, blogPostController.getAll);
router.get('/:id', authMiddleware, blogPostController.findById);

module.exports = router;