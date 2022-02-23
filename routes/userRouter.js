const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.create);
router.get('/', authMiddleware, userController.getAll);

module.exports = router;
