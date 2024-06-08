const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const path = require('path');

const router = require("./router");
const {authMiddleware} = require("./middleware/authMiddleware");

app.use(express.static( 'public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware)

app.engine('hbs', handlebars.engine({
	extname: 'hbs',
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(router);

mongoose.connect('mongodb://localhost:27017/books');

mongoose.connection.on('connected', () => console.log('DB is connected'));
mongoose.connection.on('disconnected', () => console.log('DB is disconnected'));
mongoose.connection.on('error', (err) => console.log(err))

app.listen(8000, () => console.log('Server started on port http://localhost:8000'));