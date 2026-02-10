const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Car',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1990
        }
      },
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'plate_number'
      },
      dailyRate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'daily_rate'
      },
      status: {
        type: DataTypes.ENUM('available', 'rented', 'maintenance'),
        allowNull: false,
        defaultValue: 'available'
      }
    },
    {
      tableName: 'cars',
      underscored: true
    }
  );


