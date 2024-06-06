const router = require('express').Router();
const authService = require('../service/authService');
const getErrorMessage = require('../utils/errorUtils');

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
		res.render('auth/register', {error: getErrorMessage});
	}
})

module.exports = router;