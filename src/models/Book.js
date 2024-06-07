const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	bookReview: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	stars: {
		type: Number,
		required: true,
	},
	wishingList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
});

const book = mongoose.model("Book", bookSchema)

module.exports = book;