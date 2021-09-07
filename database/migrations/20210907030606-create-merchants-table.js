'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('merchants', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
            	onDelete: 'CASCADE',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			image: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false
			},
			address: {
				type: Sequelize.STRING
			},
			city_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'cities', key: 'id' },
				onUpdate: 'CASCADE',
            	onDelete: 'SET NULL',
			},
			coordinate: {
				type: Sequelize.GEOMETRY
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
		await queryInterface.dropTable('merchants');
	}
};