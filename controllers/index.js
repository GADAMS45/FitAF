const express = require('express');
const router = express.Router();

// Import route modules
const homeRoutes = require('./api/homeRoutes');
const userRoutes = require('./api/userRoutes');
const apiRoutes = require('./api');

// Define root-level routes
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/api', apiRoutes);

module.exports = router;
