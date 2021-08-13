var express = require('express');
var router = express.Router();

const AuthController = require('../../../controllers/api/v1/AuthController');
const AuthValidator  = require('./validator/AuthValidator');


/*** AUTH ROUTE ***/
router.post('/register', AuthValidator.register, AuthController.register);
router.post('/login', AuthValidator.login, AuthController.login);

module.exports = router;
