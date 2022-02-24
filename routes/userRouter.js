const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.create);
router.get('/', authMiddleware, userController.getAll);
router.get('/:id', authMiddleware, userController.getById);
router.delete('/me', authMiddleware, userController.remove);

module.exports = router;
