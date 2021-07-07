var express = require('express');
var router = express.Router();

var userRouter = require('./user');
var merchantRouter = require('./merchant');

router.use('/user', userRouter);
router.use('/merchant', merchantRouter);

module.exports = router;
