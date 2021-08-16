var express = require('express');
var router = express.Router();

const UserController = require('../../../controllers/api/v1/UserController');
const AuthMiddleware = require('../../../middleware/AuthMiddleware');

/*** USER ROUTE ***/

router.get('/profile', AuthMiddleware.auth, UserController.profile);

router.get('/add', function(req, res, next) {
	res.send('user add');
});

module.exports = router;
