const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {}

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        goal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fitness_goals',
                key: 'goal_id',
            },
        },
        exercise_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intensity_level: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
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