var express = require('express');
var router = express.Router();

var AuthRoute = require('./AuthRoute');
var RegionRoute = require('./RegionRoute');
var StoreRoute = require('./StoreRoute');
var UserRoute = require('./UserRoute');

router.use('/auth', AuthRoute);
router.use('/regions', RegionRoute);
router.use('/stores', StoreRoute);
router.use('/users', UserRoute);

module.exports = router;
