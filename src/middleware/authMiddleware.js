const jwt = require("jsonwebtoken");

const {SECRET} = require('../config');

exports.authMiddleware = async (req, res, next) => {
	const token = req.cookies['auth'];

	if (!token) {
		return next();
	}

	try {
		const decodedToken = await jwt.verify(token, SECRET);

		req.user = decodedToken;
		res.locals.isAuthenticated = true;
		res.locals.user = decodedToken;

		next();
	} catch (err) {
		res.clearCookie('auth');
		res.redirect('/auth/login');
	}
}

exports.isAuth = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/register');
	}

	next();
}


