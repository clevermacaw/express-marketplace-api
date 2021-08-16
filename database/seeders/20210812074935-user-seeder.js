'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALT);

module.exports = {
	up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
		{
			id: uuidv4(),
			name: 'Admin',
			email: 'admin@mail.com',
			password: bcrypt.hashSync('123456', salt),
			type: 'Admin',
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: uuidv4(),
			name: 'Hello',
			email: 'hello@mail.com',
			password: bcrypt.hashSync('123456', salt),
			type: 'Customer',
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			id: uuidv4(),
			name: 'Merchant',
			email: 'merchant@mail.com',
			password: bcrypt.hashSync('123456', salt),
			type: 'Merchant',
			created_at: new Date(),
			updated_at: new Date()
		},
	], {}),

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
