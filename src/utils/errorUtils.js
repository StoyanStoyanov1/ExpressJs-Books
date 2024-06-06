const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
	if (err instanceof mongoose.Model) {
		return Object.values(err.errors).at(0);
	} else if (err instanceof  Error) {
		return err.message;
	}
};