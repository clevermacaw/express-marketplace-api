var express = require('express');
var router = express.Router();

/*** MERCHANT ROUTE ***/

router.get('/', function(req, res, next) {
    res.send('merchant');
});

router.get('/add', function(req, res, next) {
    res.send('merchant add');
});

module.exports = router;