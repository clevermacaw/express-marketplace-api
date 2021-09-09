const { City, Province } = require('../../../models');
const { successResponse } = require('../../../helpers/Helper');

const RegionController = {
    province: async (req, res) => {
        const provinces = await Province.findAll();
        successResponse(res, null, provinces);
    },

    city: async (req, res) => {
        const { params } = req;
        const cities = await City.findAll({
            where: {
                province_id: params.province_id
            }
        });
        successResponse(res, null, cities);
    }
};

module.exports = RegionController;
