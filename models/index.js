const User = require('./User');
const Exercise = require('./exercise');
const Nutrition = require('./Nutrition');

// Define model associations here
User.hasMany(Exercise, { foreignKey: 'userId', onDelete: 'CASCADE' });
Exercise.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Nutrition, { foreignKey: 'userId', onDelete: 'CASCADE' });
Nutrition.belongsTo(User, { foreignKey: 'userId' });
Exercise.belongsToMany(Nutrition, { through: 'ExerciseNutrition', foreignKey: 'exercise_id' });
Nutrition.belongsToMany(Exercise, { through: 'ExerciseNutrition', foreignKey: 'nutrition_id' });

module.exports = {
  User,
  Exercise,
  Nutrition
};
