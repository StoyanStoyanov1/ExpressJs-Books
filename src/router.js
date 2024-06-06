const router = require('express').Router();

const homeController = require('./controlller/homeController');

router.use('/', homeController);
module.exports = router;