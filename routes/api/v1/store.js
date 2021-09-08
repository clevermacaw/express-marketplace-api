var express = require('express');
var router = express.Router();

/*** STORE ROUTE ***/

router.get('/', function(req, res, next) {
    res.send('Store');
});

router.get('/add', function(req, res, next) {
    res.send('Store add');
});

module.exports = router;
