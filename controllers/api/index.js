// Update paths and constants as needed to match other files in the api folder

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const biteRoutes = require('./biteRoutes');
const commentRoutes = require('./commentRoutes');
const photoRoutes = require('./photoRoutes');
const uploadRoutes = require('./uploadRoutes');


router.use('/users', userRoutes);
router.use('/bites', biteRoutes);
router.use('/comments', commentRoutes);
router.use('/photos', photoRoutes);
router.use('/upload', uploadRoutes);



module.exports = router;
