'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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
	}, {
		sequelize,
		updatedAt: 'updated_at',
		createdAt: 'created_at',
		modelName: 'User',
	});

	return User;
};