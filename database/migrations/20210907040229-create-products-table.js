'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Products', {
			id: {
				type: Sequelize.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			store_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: { model: 'stores', key: 'id' },
				onUpdate: 'CASCADE',
            	onDelete: 'CASCADE',
			},
			subcategory_id: {
				type: Sequelize.INTEGER.UNSIGNED,
				references: { model: 'categories', key: 'id' },
				onUpdate: 'CASCADE',
            	onDelete: 'CASCADE',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.TEXT
			},
			thumbnail: {
				type: Sequelize.STRING,
				allowNull: false
			},
			image: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			video: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.INTEGER.UNSIGNED
			},
			condition: {
				type: Sequelize.ENUM('NEW', 'USED'),
				allowNull: false,
				defaultValue: 'NEW'
			},
			weight: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false
			},
			weight_unit: {
				type: Sequelize.ENUM('g', 'kg'),
				allowNull: false,
				defaultValue: 'g'
			},
			width: {
				type: Sequelize.INTEGER.UNSIGNED
			},
			height: {
				type: Sequelize.INTEGER.UNSIGNED
			},
			length: {
				type: Sequelize.INTEGER.UNSIGNED
			},
			stock: {
				type: Sequelize.INTEGER.UNSIGNED,
				allowNull: false
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false
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
		await queryInterface.dropTable('Products');
	}
};