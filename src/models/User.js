const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
	}
);

userSchema.pre('save', async () => {
	this.password = await  bcrypt.hash(this.password, 12);
});

userSchema.virtual('rePassword')
	.set((value) => {
		if (value !== this.password) {
			throw new Error("Passwords do not match");
		}
	})

const User = mongoose.model('User', userSchema);

module.exports = User;
