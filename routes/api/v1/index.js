var express = require('express');
var router = express.Router();

var authRouter = require('./auth');
var regionRouter = require('./region');
var storeRouter = require('./store');
var userRouter = require('./user');

router.use('/auth', authRouter);
router.use('/regions', regionRouter);
router.use('/stores', storeRouter);
router.use('/users', userRouter);

module.exports = router;
