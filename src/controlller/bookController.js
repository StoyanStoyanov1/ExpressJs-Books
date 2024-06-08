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
		res.redirect('/book/catalog')
	} catch (err) {
		res.render('book/create', {...bookData,error: getErrorMessage(err)});
	}

});

router.get('/catalog', async (req, res) => {
	const books = await bookService.getAll().lean();

	res.render('book/catalog', {books})
});

router.get('/:bookId/details', async (req, res) => {
	const bookId = req.params.bookId;
	const userId = req.user?._id;

	const book = await bookService.getOne(bookId).lean();

	const isOwner = book.owner == userId;

	res.render('book/details', {book, isOwner});

});

router.get('/:bookId/delete', async (req, res) => {
	const bookId = req.params.bookId;
	const userId = req.user?._id;

	const book = await bookService.getOne(bookId).lean();

	const isOwner = book.owner == userId;

	if (!isOwner) {
		return res.redirect('/book/catalog');
	}

	await bookService.delete(bookId);

	res.redirect('/book/catalog/');
})
module.exports = router;