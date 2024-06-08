const router = require('express').Router();

const homeController = require('./controlller/homeController');
const authController = require('./controlller/authController');
const userController = require('./controlller/bookController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/book', userController);

module.exports = router;