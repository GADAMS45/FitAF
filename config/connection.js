// Import the Sequelize library
const Sequelize = require('sequelize');

// Load environment variables from the .env file
require('dotenv').config();

// Create a Sequelize instance and configure it with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database username
  process.env.DB_PASSWORD,    // Database password
  {
    host: process.env.DB_HOST,  // Database host (e.g., 'localhost')
    dialect: 'mysql',           // Specify the database dialect (MySQL in this case)
    port: process.env.DB_PORT || 3306, // Database port (default is 3306 if not provided)
  }
);

// Export the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;
