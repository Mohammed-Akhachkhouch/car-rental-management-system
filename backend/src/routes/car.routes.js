const router = require('express').Router();
const carController = require('../controllers/car.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/', carController.listCars);
router.get('/:id', carController.getCarById);
router.post('/', authenticate, authorize('admin'), carController.createCar);
router.patch('/:id', authenticate, authorize('admin'), carController.updateCar);
router.delete('/:id', authenticate, authorize('admin'), carController.deleteCar);

module.exports = router;

