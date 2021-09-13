'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { storeImage, getImagePath } = require('../constants/UploadPathConst');

module.exports = (sequelize, DataTypes) => {
	class Store extends Model {
		static associate(models) {
			Store.belongsTo(models.City, { as: 'city' });
			Store.belongsTo(models.User);
			Store.hasMany(models.Product);
		}

	    toJSON() {
			var values = Object.assign({}, this.get());
			delete values.user_id;
			delete values.UserId;
			delete values.cityId;
			return values;
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
			type: DataTypes.INTEGER.UNSIGNED,
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
		image_url: {
			type: DataTypes.VIRTUAL,
			get() {
				return getImagePath(this.image, storeImage);
			}
		}
	}, {
		sequelize,
		underscored: true,
		updatedAt: 'updated_at',
		createdAt: 'created_at',
		modelName: 'Store',
	});

	return Store;
};