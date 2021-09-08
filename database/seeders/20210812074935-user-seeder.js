'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
const { userType } = require('../../constants/EnumConst');

module.exports = {
	up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
		{
			id: uuidv4(),
			name: 'Admin',
			email: 'admin@mail.com',
			password: bcrypt.hashSync('123456', salt),
			type: userType.admin,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: uuidv4(),
			name: 'Hello',
			email: 'hello@mail.com',
			password: bcrypt.hashSync('123456', salt),
			type: userType.customer,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: uuidv4(),
			name: 'Store',
			email: 'store@mail.com',
			password: bcrypt.hashSync('123456', salt),
			type: userType.store,
			created_at: new Date(),
			updated_at: new Date()
		},
	], {}),

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
	}
};
