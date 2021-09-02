'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('provinces', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('provinces');
	}
};
