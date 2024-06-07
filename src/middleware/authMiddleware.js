const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

exports.authMiddleware = async (req, res, next) => {
	const token = req.cookies['auth'];

	if (!token) {
		return next();
	}

	try {
		const decodedToken = await jwt.verify(token, SECRET);

		req.user = decodedToken;
		req.local.isAuthenticated = true;
		res.locals.user = decodedToken;

		next();
	} catch (err) {
		res.clearCookie('auth');
		res.redirect('/auth/login');
	}
};