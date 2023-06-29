// Update paths and constants as needed to match other files in the api folder

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const biteRoutes = require('./biteRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/bites', biteRoutes);
router.use('/comments', commentRoutes);



module.exports = router;
