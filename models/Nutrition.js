const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Nutrition extends Model {}

Nutrition.init(
  {
    // Define attributes such as id, calories, protein, carbs, fats, etc.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    protein: {
      type: DataTypes.INTEGER, // In grams
      allowNull: false
    },
    carbs: {
      type: DataTypes.INTEGER, // In grams
      allowNull: false
    },
    fats: {
      type: DataTypes.INTEGER, // In grams
      allowNull: false
    },
    // Any other nutritional information
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'nutrition',
  }
);

module.exports = Nutrition;