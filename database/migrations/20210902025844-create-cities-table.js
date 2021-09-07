'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('cities', {
			id: {
				type: Sequelize.INTEGER.UNSIGNED,
				primaryKey: true,
				allowNull: false
			},
			province_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false,
				references: { model: 'provinces', key: 'id' },
				onUpdate: 'CASCADE',
            	onDelete: 'CASCADE',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			postal_code: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('cities');
	}
};
