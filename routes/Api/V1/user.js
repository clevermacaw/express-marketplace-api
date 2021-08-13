var express = require('express');
var router = express.Router();

/*** USER ROUTE ***/

router.get('/', function(req, res, next) {
	res.send('user');
});

router.get('/add', function(req, res, next) {
	res.send('user add');
});

module.exports = router;
