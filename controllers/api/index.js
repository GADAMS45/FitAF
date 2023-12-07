const express = require('express');
const router = express.Router();

// Import API-specific route modules
const exerciseRoutes = require('./exerciseRoutes');
const nutritionRoutes = require('./nutritionRoutes');

// Define API subroutes
router.use('/exercises', exerciseRoutes);
router.use('/nutrition', nutritionRoutes);

module.exports = router;
