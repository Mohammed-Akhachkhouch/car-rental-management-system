const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/', authenticate, reservationController.createReservation);
router.get('/me', authenticate, reservationController.getMyReservations);
router.get('/', authenticate, authorize('admin'), reservationController.getAllReservations);
router.patch('/:id/status', authenticate, authorize('admin'), reservationController.updateReservationStatus);

module.exports = router;

