// Import the Express Router
const router = require('express').Router();

// Import the userRoutes and homeRoutes (and other routers if added in the future)
const userRoutes = require('./userRoutes'); // Import routes related to user management
const homeRoutes = require('./homeRoutes'); // Import routes for the home/dashboard
const exerciseRoutes = require('./exerciseRoutes'); // Import routes for exerciseRoutes

// Use routers to define the routing structure
router.use('/users', userRoutes); // Use userRoutes for routes starting with '/users'
router.use('/', homeRoutes); // Use homeRoutes for routes starting with '/' (root)
router.use('/exercises', exerciseRoutes); // Use exerciseRoutes

// Export the configured router to be used in your application
module.exports = router;
