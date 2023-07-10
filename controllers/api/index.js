const router = require('express').Router();
const userRoutes = require('./userRoutes');
const biteRoutes = require('./biteRoutes');
const commentRoutes = require('./commentRoutes');
const photoRoutes = require('./photoRoutes');

router.use('/users', userRoutes);
router.use('/bites', biteRoutes);
router.use('/comments', commentRoutes);
router.use('/photos', photoRoutes);

module.exports = router;
