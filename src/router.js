const router = require('express').Router();

const homeController = require('./controlller/homeController');
const authController = require('./controlller/authController');

router.use('/', homeController);
router.use('/auth', authController);

module.exports = router;