const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const nutritionRoutes = require('./nutritionRoutes');

router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/nutrition', nutritionRoutes);

module.exports = router;