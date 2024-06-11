const router = require('express').Router();

const homeController = require('./controlller/homeController');
const authController = require('./controlller/authController');
const userController = require('./controlller/bookController');
const {getErrorMessage} = require("./utils/errorUtils");

router.use('/', homeController);
router.use('/auth', authController);
router.use('/book', userController);

router.use('*', (req, res) => {
	res.render('404', {error: 'Not Found'});
})

module.exports = router;