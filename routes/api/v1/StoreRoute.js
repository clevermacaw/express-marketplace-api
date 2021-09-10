var express = require('express');
var router = express.Router();

const StoreController = require('../../../controllers/api/v1/StoreController');
const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const StoreMiddleware = require('../../../middleware/StoreMiddleware');
const StoreValidator  = require('./validator/StoreValidator');

/*** STORE ROUTE ***/

router.use(AuthMiddleware.auth);

router.post('/register', StoreValidator.register, StoreController.register);
router.get('/profile', StoreMiddleware.store, StoreController.profile);
router.post('/profile/update', StoreMiddleware.store, StoreValidator.updateProfile, StoreController.updateProfile);

module.exports = router;
