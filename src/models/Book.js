const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 2;
			},
			message: 'Title muss be at least 2 characters.',
		},
	},
	author: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 2;
			},
			message: 'Title muss be at least 2 characters.',
		},
	},
	image: {
		type: String,
		required: true,
	},
	review: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 10;
			},
			message: 'Review muss be at least 10 characters.',
		},
	},
	genre: {
		type: String,
		required: true,
	},
	stars: {
		type: Number,
		required: true,
		validate: {
			validator: (value) => {
				return value >= 1 && value <= 5;
			},
			message: 'Stars Must Be Between 1 And 5'
		},
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