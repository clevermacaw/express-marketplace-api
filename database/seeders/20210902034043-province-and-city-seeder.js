'use strict';
const { Province } = require('../../models');
const { getProvinces, getCities }  = require('../../helpers/CourierHelper');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		var provinces = await getProvinces();

		await Promise.all(provinces.map(async (item) => {
			var [province, cities] = await Promise.all([
				// insert province
				Province.create({
					id: item.province_id,
					name: item.province
		        }),

		        // get cities by province
				getCities(item.province_id)
			]);

			var data = [];
			cities.forEach((city, i) => {
				data.push({
					id: city.city_id,
					province_id: item.province_id,
					name: city.city_name,
					type: city.type,
					postal_code: city.postal_code,
				});
			});
			// insert cities
			await queryInterface.bulkInsert('cities', data);
		}));
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('provinces', null, { cascade: true });
		await queryInterface.bulkDelete('cities', null, {});
	}
};
