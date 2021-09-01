var express = require('express');
var router = express.Router();

const UserController = require('../../../controllers/api/v1/UserController');
const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const UserValidator  = require('./validator/UserValidator');

/*** USER ROUTE ***/

// middleware that is specific to this router
router.use(AuthMiddleware.auth);

router.get('/profile', UserController.profile);

router.post('/update', UserValidator.update, UserController.update);

router.post('/change-password', UserValidator.changePassword, UserController.changePassword);

module.exports = router;
