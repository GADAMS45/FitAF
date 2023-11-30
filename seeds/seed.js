// Import necessary modules
const sequelize = require('../config/connection'); // Import the Sequelize instance
const { User } = require('../models'); // Import the User model
const userData = require('./userData.json'); // Import user data from a JSON file

// Define a function to seed the database with user data
const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Sync the database and force it to drop existing tables

  await User.bulkCreate(userData, { // Bulk create users using the imported data
    individualHooks: true, // Use individual hooks for each user
    returning: true, // Return the created user data
  });

  process.exit(0); // Exit the process after seeding is complete
};

// Call the seedDatabase function to initiate the seeding process
seedDatabase();
