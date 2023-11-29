// Import the Express Router
const router = require('express').Router();

// Import necessary modules and libraries
const passport = require('passport'); // Passport for authentication
const { User } = require('../../models'); // Sequelize User model
const bcrypt = require('bcrypt'); // Library for hashing passwords

// Register route
router.post('/register', async (req, res) => {
  try {
    // Create a new user using the User model and provided email and hashed password
    const newUser = await User.create({
      email: req.body.email, // Email from the request body
      password: await bcrypt.hash(req.body.password, 10), // Hashed password
    });
    
    // Redirect to the login page after successful registration
    res.redirect('/login');
  } catch (error) {
    // Handle any errors that occur during registration
    res.status(500).json(error); // Respond with a 500 Internal Server Error and send the error as JSON
  }
});

// Login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redirect to the homepage on successful login
  failureRedirect: '/login', // Redirect to the login page on failed login
}));

// Logout route
router.post('/logout', (req, res) => {
  // Passport's logout method is called to log the user out
  req.logout(() => {
    // Redirect to the login page after logging out
    res.redirect('/login');
  });
});

// Export the configured router to be used in your Express application
module.exports = router;
