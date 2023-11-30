const passport = require('passport'); // Import the Passport library
const LocalStrategy = require('passport-local').Strategy; // Import the LocalStrategy from Passport
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { User } = require('../models'); // Import the User model

// Configure Passport to use a LocalStrategy for authentication
passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } }); // Find a user with the provided email
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' }); // If no user is found, return an error message
      }
      if (!await bcrypt.compare(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' }); // If password doesn't match, return an error message
      }
      return done(null, user); // If authentication is successful, return the user object
    } catch (err) {
      return done(err); // Handle any errors that occur during authentication
    }
  }
));

// Serialize the user object to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user object from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id); // Find the user by their ID
    done(null, user); // Return the user object
  } catch (err) {
    done(err); // Handle any errors that occur during deserialization
  }
});

module.exports = passport; // Export the configured Passport instance
