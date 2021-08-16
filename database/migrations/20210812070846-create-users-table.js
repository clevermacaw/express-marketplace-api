'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			device_token: {
				type: Sequelize.STRING,
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
