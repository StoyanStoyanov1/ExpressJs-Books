const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

const path = require('path');

const router = require("./router");

app.use(express.static( 'public'));
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
	extname: 'hbs',
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(router)

app.listen(8000, () => console.log('Server started on port http://localhost:8000'));