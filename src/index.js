const express = require('express');
const app = express();

const path = require('path');

const router = require("./router");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

app.use(router)

app.listen(8000, () => console.log('Server started on port http://localhost:8000'));