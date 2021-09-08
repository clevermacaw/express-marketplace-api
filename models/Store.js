'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class Store extends Model {
		static associate(models) {
			Store.belongsTo(models.City);
			Store.belongsTo(models.User);
			Store.hasMany(models.Product);
		}
	};

	Store.init({
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
		domain: {
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
		city_id: {
			type: DataTypes.INTEGER,
			references: { model: 'City', key: 'id' },
			onUpdate: 'CASCADE',
        	onDelete: 'CASCADE',
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
		modelName: 'Store',
	});

	return Store;
};