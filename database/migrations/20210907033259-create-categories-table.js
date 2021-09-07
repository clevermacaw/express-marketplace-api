'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('categories', {
			id: {
				type: Sequelize.INTEGER.UNSIGNED,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			category_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'categories', key: 'id' },
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
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('categories');
	}
};