'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Province extends Model {
		static associate(models) {
			Province.hasMany(models.City);
		}
	};

	Province.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, {
		sequelize,
		timestamps: false,
		modelName: 'Province',
	});

	return Province;
};