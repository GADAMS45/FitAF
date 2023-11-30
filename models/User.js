const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to check if the provided password matches the hashed password in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validate that the email is in the correct format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Validate that the password is at least 8 characters long
      },
    },
  },
  {
    hooks: {
      // Hook to hash the password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the password
        return newUserData; // Return the modified user data
      },
    },
    sequelize, // Pass the Sequelize instance
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use snake_case for column names
    modelName: 'user', // Define the model name
  }
);

module.exports = User; // Export the User model
