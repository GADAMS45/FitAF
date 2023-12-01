const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

// Import models
const User = require('./User'); // Import the User model
const Exercise = require('./exercise'); // Import the Exercise model
const Nutrition = require('./Nutrition'); // Import the Nutrition model

// Initialize models
User.init(sequelize); // Initialize the User model with the Sequelize instance
Exercise.init(sequelize); // Initialize the Exercise model with the Sequelize instance
Nutrition.init(sequelize); // Initialize the Nutrition model with the Sequelize instance

// Define relationships between models
User.hasMany(Exercise, {
  foreignKey: 'userId', // Define a foreign key relationship in User model
  onDelete: 'CASCADE', // Define the cascade delete behavior
});

Exercise.belongsTo(User, {
  foreignKey: 'userId', // Define a foreign key relationship in Exercise model
});

User.hasOne(Nutrition, {
  foreignKey: 'userId', // Define a foreign key relationship in User model
  onDelete: 'CASCADE', // Define the cascade delete behavior
});

Nutrition.belongsTo(User, {
  foreignKey: 'userId', // Define a foreign key relationship in Nutrition model
});

Exercise.belongsToMany(Nutrition, {
  through: 'ExerciseNutrition',
  foreignKey: 'exercise_id',
});

Nutrition.belongsToMany(Exercise, {
  through: 'ExerciseNutrition',
  foreignKey: 'nutrition_id',
});

// Export models and the Sequelize instance
module.exports = {
  sequelize, // Export the Sequelize instance
  Sequelize, // Export the Sequelize class for defining data types
  User, // Export the User model
  Exercise, // Export the Exercise model
  Nutrition, // Export the Nutrition model
  // You can export other models here
};
