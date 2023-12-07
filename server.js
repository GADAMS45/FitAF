require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { passport } = require('./utils/auth');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const nutritionRoutes = require('./controllers/api/nutritionRoutes');
const exerciseRoutes = require('./controllers/api/exerciseRoutes');
const sequelize = require('./config/connection');
const db = require('./controllers/api/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware and other setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

db.connectDatabase();

// Handlebars setup
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
app.use(routes);
app.use('/api', nutritionRoutes);
app.use('/api', exerciseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync Sequelize models and then start the server
sequelize.sync({ force: false }).then(async () => {
  try {
    await db.connectDatabase(); // Ensure the database is connected
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
