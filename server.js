require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { passport } = require('./utils/auth');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const nutritionRoutes = require('./controllers/nutritionRoutes');
const exerciseRoutes = require('./controllers/exerciseRoutes');
const sequelize = require('./config/connection');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware and other setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

// Handlebars setup
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

console.log('Views Directory:', app.get('views'));

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
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
