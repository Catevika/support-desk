const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// ? @desc    Register a new user
// ? @routes  /api/users
// ? @access  Public
const registerUser = asyncHandler(async (req, res) => {

	const { name, email, password, role } = req.body;

	// * validation
	if (!name || !email || !password || role === 'Select...') {

		res.status(400);
		throw new Error('Please include all fields');
	}

	// * Find if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// * Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// * Create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		role
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id)
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// ? @desc    Login a user
// ? @routes  /api/users/login
// ? @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	// * Check user and password match
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id)

		});
	} else {
		res.status(401);
		throw new Error('Invalid credentials');
	}
});

// ? @desc    Get current user
// ? @routes  /api/users/me
// ? @access  Private
const getMe = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
		role: req.user.role
	};
	res.status(200).json(user);
});

// * Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
};

module.exports = { registerUser, loginUser, getMe };
