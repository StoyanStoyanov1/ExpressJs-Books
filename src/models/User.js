const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 4;
			},
			message: 'Username must be at least 4 characters.',
		},
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 4;
			},
			message: 'Email must be at least 4 characters.',
		}
	},
	password: {
		type: String,
		minLength: 3,
		required: true,
		validate: {
			validator: (value) => {
				return value.length > 3;
			},
			message: 'Password must be at least 3 characters.',
		}
	},
	bookList: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book',
	}],
	wishingBooks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book',
	}]
});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
	}
	next();
});

userSchema.virtual('rePassword')
	.set(function (value) {
		if (value !== this.password) {
			throw new Error("Passwords do not match");
		}
	});

const User = mongoose.model('User', userSchema);

module.exports = User;
