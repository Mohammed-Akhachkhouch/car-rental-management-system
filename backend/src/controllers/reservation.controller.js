const { Op } = require('sequelize');
const asyncHandler = require('../utils/async-handler');
const { Reservation, Car, User } = require('../db/models');

const msPerDay = 24 * 60 * 60 * 1000;

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end - start;

  return Math.ceil(diff / msPerDay);
};

const createReservation = asyncHandler(async (req, res) => {
  const { carId, startDate, endDate } = req.body;

  if (!carId || !startDate || !endDate) {
    return res.status(400).json({
      message: 'carId, startDate and endDate are required.'
    });
  }

  const days = calculateDays(startDate, endDate);

  if (days <= 0) {
    return res.status(400).json({
      message: 'endDate must be later than startDate.'
    });
  }

  const car = await Car.findByPk(carId);

  if (!car) {
    return res.status(404).json({ message: 'Car not found.' });
  }

  if (car.status !== 'available') {
    return res.status(409).json({ message: 'Car is not available for reservation.' });
  }

  const overlappingReservation = await Reservation.findOne({
    where: {
      carId,
      status: {
        [Op.notIn]: ['cancelled', 'completed']
      },
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate]
          }
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate]
          }
        },
        {
          [Op.and]: [
            { startDate: { [Op.lte]: startDate } },
            { endDate: { [Op.gte]: endDate } }
          ]
        }
      ]
    }
  });

  if (overlappingReservation) {
    return res.status(409).json({
      message: 'Car already has a conflicting reservation in this period.'
    });
  }

  const totalPrice = Number(car.dailyRate) * days;

  const reservation = await Reservation.create({
    userId: req.user.id,
    carId,
    startDate,
    endDate,
    totalPrice,
    status: 'confirmed'
  });

  return res.status(201).json({ data: reservation });
});

const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { userId: req.user.id },
    include: [{ model: Car, as: 'car' }],
    order: [['createdAt', 'DESC']]
  });

  return res.status(200).json({ data: reservations });
});

const getAllReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.findAll({
    include: [
      { model: Car, as: 'car' },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'fullName', 'email', 'role']
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  return res.status(200).json({ data: reservations });
});

const updateReservationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}.`
    });
  }

  const reservation = await Reservation.findByPk(req.params.id);

  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found.' });
  }

  reservation.status = status;
  await reservation.save();

  return res.status(200).json({ data: reservation });
});

module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus
};


