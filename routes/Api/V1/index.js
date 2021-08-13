var express = require('express');
var router = express.Router();

var authRouter = require('./auth');
var merchantRouter = require('./merchant');
var userRouter = require('./user');

router.use('/auth', authRouter);
router.use('/merchant', merchantRouter);
router.use('/user', userRouter);

module.exports = router;
