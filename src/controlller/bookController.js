const router = require('express').Router();
const bookService = require('../service/bookService');
const {getErrorMessage} = require('../utils/errorUtils')
const {isAuth} = require("../middleware/authMiddleware");

router.get('/create', isAuth, (req, res) => {
	res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
	const bookData = req.body;
	bookData.owner = req.user._id;

	try {
		const book = await bookService.create(bookData);
		await bookService.pushBookInBookList(book._id, req.user._id);
		res.redirect('/book/catalog');
	} catch (err) {
		res.render('book/create', {...bookData, error: getErrorMessage(err)});
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

	const isRead = await bookService.hasUserReadBook(bookId, userId);

	res.render('book/details', {book, isOwner, isRead});

});

router.get('/:bookId/delete',  isAuth, async (req, res) => {
	const bookId = req.params.bookId;
	const userId = req.user?._id;

	const book = await bookService.getOne(bookId).lean();

	const isOwner = book.owner == userId;

	if (!isOwner) {
		return res.redirect('/book/catalog');
	}

	await bookService.delete(bookId, userId);

	res.redirect('/book/catalog/');
});

router.get('/:bookId/edit', isAuth, async (req, res) => {
	const bookId = req.params.bookId;

	try {
		const book = await bookService.getOne(bookId).lean();
		res.render('book/edit', {...book});

	} catch (err) {
		res.redirect(`/book/catalog`);
		res.render('book/catalog', {error: getErrorMessage(err)});
	}
});

router.post('/:bookId/edit', isAuth, async (req, res) => {
	try {
		const bookData = req.body;
		const bookId = req.params.bookId;
		await bookService.edit(bookId, bookData);
		res.redirect(`/book/${bookId}/details`)
	} catch (err) {
		res.render('book/edit', {error: getErrorMessage(err)})
	}
});

router.get('/:bookId/read', async (req, res) => {
	const bookId = req.params.bookId;
	const userId = req.user?._id;

	await bookService.readBook(bookId, userId);

	res.redirect(`/book/${bookId}/details`);

});

module.exports = router;