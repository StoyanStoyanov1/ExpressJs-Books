const Book = require("../models/Book");

exports.create = (bookDate) => Book.create(bookDate);

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId);

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);