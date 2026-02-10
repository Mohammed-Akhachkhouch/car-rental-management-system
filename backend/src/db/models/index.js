const sequelize = require('../../config/database');
const defineUser = require('./user.model');
const defineCar = require('./car.model');
const defineReservation = require('./reservation.model');

const User = defineUser(sequelize);
const Car = defineCar(sequelize);
const Reservation = defineReservation(sequelize);

User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
Car.hasMany(Reservation, { foreignKey: 'carId', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Reservation.belongsTo(Car, { foreignKey: 'carId', as: 'car' });

module.exports = {
  sequelize,
  User,
  Car,
  Reservation
};


