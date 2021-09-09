var express = require('express');
var router = express.Router();

const RegionController = require('../../../controllers/api/v1/RegionController');

/*** REGION ROUTE ***/
router.get('/province', RegionController.province);
router.get('/city/:province_id', RegionController.city);

module.exports = router;
