const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash'
      },
      role: {
        type: DataTypes.ENUM('customer', 'admin'),
        allowNull: false,
        defaultValue: 'customer'
      }
    },
    {
      tableName: 'users',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['passwordHash'] }
      },
      scopes: {
        withPassword: {
          attributes: { include: ['passwordHash'] }
        }
      }
    }
  );

