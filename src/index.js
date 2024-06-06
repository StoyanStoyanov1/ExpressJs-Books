const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const path = require('path');

const router = require("./router");

app.use(express.static( 'public'));
app.use(express.urlencoded({ extended: true }));

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