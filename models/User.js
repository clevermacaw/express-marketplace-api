'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { userImage, getImagePath } = require('../constants/UploadPathConst');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasOne(models.Store, { as: 'store', foreignKey: 'user_id' });
		}

	    toJSON() {
			var values = Object.assign({}, this.get());

			delete values.password;
			return values;
	    }
	};

	User.init({
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: uuidv4()
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		device_token: {
			type: DataTypes.STRING,
			allowNull: true
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
				return getImagePath(this.image, userImage);
			}
		}
	}, {
		sequelize,
		underscored: true,
		updatedAt: 'updated_at',
		createdAt: 'created_at',
		modelName: 'User',
	});

	return User;
};