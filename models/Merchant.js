'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class Merchant extends Model {
		static associate(models) {
			Merchant.belongsTo(models.City);
			Merchant.belongsTo(models.User);
			Merchant.hasMany(models.Product);
		}
	};

	Merchant.init({
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: uuidv4()
		},
		user_id: {
			type: DataTypes.UUID,
			references: { model: 'User', key: 'id' },
			onUpdate: 'CASCADE',
        	onDelete: 'CASCADE',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
		},
		city_id: {
			type: DataTypes.INTEGER,
			references: { model: 'City', key: 'id' },
			onUpdate: 'CASCADE',
        	onDelete: 'CASCADE',
		},
		coordinate: {
			type: DataTypes.GEOMETRY,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: new Date()
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: new Date()
		},
	}, {
		sequelize,
		updatedAt: 'updated_at',
		createdAt: 'created_at',
		modelName: 'Merchant',
	});

	return Merchant;
};