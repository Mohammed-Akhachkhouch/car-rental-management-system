const asyncHandler = require('../utils/async-handler');
const { Car } = require('../db/models');

const listCars = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const where = {};

  if (status) {
    where.status = status;
  }

  const cars = await Car.findAll({
    where,
    order: [['createdAt', 'DESC']]
  });

  return res.status(200).json({ data: cars });
});

const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ message: 'Car not found.' });
  }

  return res.status(200).json({ data: car });
});

const createCar = asyncHandler(async (req, res) => {
  const { brand, model, year, plateNumber, dailyRate, status } = req.body;

  if (!brand || !model || !year || !plateNumber || !dailyRate) {
    return res.status(400).json({
      message: 'brand, model, year, plateNumber, and dailyRate are required.'
    });
  }

  const car = await Car.create({
    brand,
    model,
    year,
    plateNumber,
    dailyRate,
    status: status || 'available'
  });

  return res.status(201).json({ data: car });
});

const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ message: 'Car not found.' });
  }

  const { brand, model, year, plateNumber, dailyRate, status } = req.body;

  await car.update({
    brand: brand ?? car.brand,
    model: model ?? car.model,
    year: year ?? car.year,
    plateNumber: plateNumber ?? car.plateNumber,
    dailyRate: dailyRate ?? car.dailyRate,
    status: status ?? car.status
  });

  return res.status(200).json({ data: car });
});

const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ message: 'Car not found.' });
  }

  await car.destroy();
  return res.status(204).send();
});

module.exports = {
  listCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};


