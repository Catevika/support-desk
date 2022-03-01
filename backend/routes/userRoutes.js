const express = require('express');
const router = express.Router();
const {
	getUserList,
	registerUser,
	loginUser,
	getMe
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/all', getUserList);

router.get('/me', protect, getMe);

module.exports = router;
