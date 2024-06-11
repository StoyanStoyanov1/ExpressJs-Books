const router = require('express').Router();
const authService = require('../service/authService');
const {getErrorMessage} = require('../utils/errorUtils');
const {isAuth} = require("../middleware/authMiddleware");
const bookService = require('../service/bookService');

router.get('/register', (req, res) => {
	res.render('auth/register');
});

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const token = await authService.register(userData);
		res.cookie('auth', token);

		res.redirect('/');
	} catch (err) {
		res.render('auth/register', {error: getErrorMessage(err)});
	}
});

router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.post('/login', async (req, res) => {

	const loginData = req.body;

	try {
		const token = await authService.login(loginData);

		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		res.render('auth/login', {error: getErrorMessage(err)});
	}
});

router.get('/logout', (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

router.get('/profile', isAuth, async (req, res) => {
	const email = req.user.email;
	const wishingBooks = Array(req.user.wishingBooks);

	if (!email || !Array.isArray(wishingBooks) || wishingBooks.length === 0) {
		return res.status(400).render('auth/profile', { error: 'Missing email or wishingBooks' });
	}

	const books = [];
	const errors = [];

	for (const bookId of wishingBooks) {
		try {
			const book = await bookService.getOne(bookId).lean();
			books.push(book);
		} catch (err) {
			errors.push(getErrorMessage(err));
		}
	}

	if (errors.length > 0) {
		res.render('auth/profile', { email, books, errors });
	} else {
		res.render('auth/profile', { email, books });
	}
});

module.exports = router;