require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const session = require('express-session');
const passport = require('./utils/auth'); // Passport authentication setup
const routes = require('./controllers'); // Import your routes
const helpers = require('./utils/helpers'); // Helper functions

const app = express();
const PORT = process.env.PORT || 3000; // Define the server port

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Set up Handlebars.js as your view engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  helpers, // Add custom Handlebars helpers here
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret for session management
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

app.use(routes); // Use routes from the controllers

// Error handling middleware should be the last piece of middleware added to the app
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
