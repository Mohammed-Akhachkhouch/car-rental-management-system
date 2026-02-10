const router = require('express').Router();
const authRoutes = require('./auth.routes');
const carRoutes = require('./car.routes');
const reservationRoutes = require('./reservation.routes');

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/cars', carRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;

