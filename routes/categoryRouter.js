const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', authMiddleware, categoryController.create);

module.exports = router;