const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', authMiddleware, categoryController.create);
router.get('/', authMiddleware, categoryController.getAll);

module.exports = router;