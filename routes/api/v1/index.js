var express = require('express');
var router = express.Router();

var authRouter = require('./auth');
var storeRouter = require('./store');
var userRouter = require('./user');

router.use('/auth', authRouter);
router.use('/stores', storeRouter);
router.use('/users', userRouter);

module.exports = router;
