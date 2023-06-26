// Update paths and constants as needed to match other files in the api folder

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const biteRoutes = require('./biteRoutes');

router.use('/users', userRoutes);
router.use('/bites', biteRoutes);

module.exports = router;
