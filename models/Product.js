'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			Product.belongsTo(models.Category, { as: 'Subcategory' });
			Product.belongsTo(models.Merchant);
		}
	};

	Product.init({
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		merchant_id: {
			type: DataTypes.UUID,
			references: { model: 'Merchant', key: 'id' },
			onUpdate: 'CASCADE',
        	onDelete: 'CASCADE',
		},
		subcategory_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			references: { model: 'Category', key: 'id' },
			onUpdate: 'CASCADE',
        	onDelete: 'CASCADE',
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: DataTypes.TEXT,
		thumbnail: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		video: DataTypes.STRING,
		price: DataTypes.INTEGER.UNSIGNED,
		condition: {
			type: DataTypes.ENUM('NEW', 'USED'),
			allowNull: false,
			defaultValue: 'NEW'
		},
		weight: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		weight_unit: {
			type: DataTypes.ENUM('g', 'kg'),
			allowNull: false,
			defaultValue: 'g'
		},
		width: DataTypes.INTEGER.UNSIGNED,
		height: DataTypes.INTEGER.UNSIGNED,
		length: DataTypes.INTEGER.UNSIGNED,
		stock: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
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
		modelName: 'Product',
	});

	return Product;
};