const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Reservation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
      },
      carId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'car_id'
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'start_date'
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'end_date'
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_price'
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'active', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
      }
    },
    {
      tableName: 'reservations',
      underscored: true
    }
  );


