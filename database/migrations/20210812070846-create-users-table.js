'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			type: {
				allowNull: false,
				type: Sequelize.STRING
			},
			device_token: {
				allowNull: true,
				type: Sequelize.STRING
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
