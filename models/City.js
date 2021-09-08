'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class City extends Model {
		// relationships
		static associate(models) {
			City.belongsTo(models.Province);
		}
	};

	City.init({
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			allowNull: false
		},
		province_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			references: { model: 'Province', key: 'id' },
			onUpdate: 'CASCADE',
        	onDelete: 'CASCADE',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		postal_code: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'City',
	});

	return City;
};