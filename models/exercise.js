const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const router = require('express').Router();

class Exercise extends Model {}
  
Exercise.init(
  {
    // Define attributes such as id, name, duration, type, etc.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes, for example
      allowNull: false
    },
    // Other attributes like type, intensity
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise',
  }
);

module.exports = Exercise;