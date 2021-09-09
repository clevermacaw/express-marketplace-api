var express = require('express');
var router = express.Router();

const StoreController = require('../../../controllers/api/v1/StoreController');
const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const StoreValidator  = require('./validator/StoreValidator');

/*** STORE ROUTE ***/

router.use(AuthMiddleware.auth);

router.post('/register', StoreValidator.register, StoreController.register);

module.exports = router;
