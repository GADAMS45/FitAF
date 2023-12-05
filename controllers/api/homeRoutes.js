// Import the Express Router
const router = require('express').Router();

// Import necessary modules and models
const { Exercise, Nutrition } = require('../../models'); // Sequelize models for Exercise and Nutrition

// Import middleware to protect this route and ensure the user is logged in
const { ensureAuthenticated } = require('../../utils/auth');

// Define a route for the user dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // Query the Exercise model to retrieve exercise data for the logged-in user
    const exercises = await Exercise.findAll({
      // Add your query here, for example: where: { userId: req.user.id }
    });
    
    // Query the Nutrition model to retrieve nutrition data for the logged-in user
    const nutrition = await Nutrition.findOne({
      // Add your query here, for example: where: { userId: req.user.id }
    });
    
    // Map the retrieved data to a format that Handlebars can work with
    const exerciseData = exercises.map(exercise => exercise.get({ plain: true }));
    
    // Check if nutrition data is available, and if so, map it as well
    const nutritionData = nutrition ? nutrition.get({ plain: true }) : {};

    // Render the dashboard view with the retrieved and mapped data
    res.render('dashboard', {
      exercises: exerciseData, // Pass the exercise data to the view
      nutrition: nutritionData // Pass the nutrition data to the view
    });
  } catch (err) {
    // Handle any errors that occur during data retrieval or rendering
    console.error('Error fetching dashboard data:', err);
    res.status(500).render('error', { error: err }); // Render an error view with the error message
  }
});

// Export the configured router to be used in your Express application
module.exports = router;
