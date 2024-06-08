const Book = require("../models/Book");

exports.create = (bookDate) => Book.create(bookDate);