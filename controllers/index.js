// Import the Express Router
const router = require('express').Router();

// Import other route handlers
const apiRoutes = require('./api'); // API-related routes
const homeRoutes = require('./homeRoutes'); // Home/dashboard-related routes
const userRoutes = require('./userRoutes'); // User-related routes

// Define the route structure for your application
router.use('/', homeRoutes); // Routes for the home/dashboard (root) URL
router.use('/users', userRoutes); // Routes related to user management (e.g., registration, login, logout)
router.use('/api', apiRoutes); // API routes for handling data requests

// Export the configured router to be used in your Express application
module.exports = router;
