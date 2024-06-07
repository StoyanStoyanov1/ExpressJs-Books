const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
	if (userData.password !== userData.rePassword) {
		throw new Error('Password mismatch');
	}

	const user = await User.findOne({email: userData.email});

	if (user) {
		throw new Error('User already exists');
	}

	const createUser = await User.create(userData);

	const token = await generateToken(createUser);

	return token;
}

exports.login = async ({email, password}) => {
	const user = await User.findOne({email});

	if (!user) {
		throw new Error('User does not exist');
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		throw new Error('Invalid password');
	}

	const token = await generateToken(user);

	return token;
}


async function generateToken(user) {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET, { expiresIn: '2h'});

	return token

}