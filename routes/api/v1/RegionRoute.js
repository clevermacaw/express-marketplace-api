var express = require('express');
var router = express.Router();

const RegionController = require('../../../controllers/api/v1/RegionController');

/*** REGION ROUTE ***/
router.get('/provinces', RegionController.province);
router.get('/cities/:province_id', RegionController.city);

module.exports = router;
