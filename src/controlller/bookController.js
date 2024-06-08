const router = require('express').Router();
const bookService = require('../service/bookService');
const {getErrorMessage} = require('../utils/errorUtils')

router.get('/create', (req, res) => {
	res.render('book/create');
});

router.post('/create', async (req, res) => {
	const bookData = req.body;
	bookData.owner = req.user._id;

	try {
		await bookService.create(bookData);
		res.redirect('/')
	} catch (err) {
		res.render('book/create', {...bookData,error: getErrorMessage(err)});
	}

})

module.exports = router;