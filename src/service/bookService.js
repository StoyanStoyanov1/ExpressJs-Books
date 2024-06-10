const Book = require("../models/Book");
const User = require("../models/User")

exports.create = (bookDate) => Book.create(bookDate);

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId);

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, {...bookData});

exports.pushUserInWishingList = (bookId, userId) => Book.findByIdAndUpdate(bookId, {$push: {wishingList: userId}});

exports.pushBookInWishingBooks = (bookId, userId) => User.findByIdAndUpdate(userId, {$push: {wishingBooks: bookId}});

exports.pushBookInBookList = (bookId, userId) => User.findByIdAndUpdate(userId, {$push: {bookList: bookId}})