'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			Category.hasMany(models.Category);
			Category.hasMany(models.Product, { targetKey: 'subcategory_id' });
		}
	};

	Category.init({
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		category_id: DataTypes.INTEGER.UNSIGNED,
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: DataTypes.STRING,
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
		underscored: true,
		updatedAt: 'updated_at',
		createdAt: 'created_at',
		modelName: 'Category',
	});

	return Category;
};