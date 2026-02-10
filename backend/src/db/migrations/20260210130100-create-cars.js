'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      daily_rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('available', 'rented', 'maintenance'),
        allowNull: false,
        defaultValue: 'available'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cars');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_cars_status";');
  }
};


