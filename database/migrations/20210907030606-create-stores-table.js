'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('stores', {
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
				allowNull: false,
				unique: true
			},
			domain: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
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
			city_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'cities', key: 'id' },
				onUpdate: 'CASCADE',
            	onDelete: 'SET NULL',
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
		await queryInterface.dropTable('stores');
	}
};