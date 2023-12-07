require('dotenv').config();
const mysql = require('mysql');

// Database connection setup using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Function to store exercise plan
const storeExercisePlan = (userId, exercisePlan) => {
    exercisePlan.forEach(plan => {
        const query = 'INSERT INTO exercise_plans (user_id, exercise_details) VALUES (?, ?)';
        db.query(query, [userId, JSON.stringify(plan)], (err, result) => {
            if (err) throw err;
            console.log('Exercise plan stored for user:', userId);
        });
    });
};

// Function to store meal plan
const storeMealPlan = (userId, mealPlan) => {
    Object.entries(mealPlan).forEach(([day, meals]) => {
        const query = 'INSERT INTO meal_plans (user_id, day, meal_details) VALUES (?, ?, ?)';
        db.query(query, [userId, day, JSON.stringify(meals)], (err, result) => {
            if (err) throw err;
            console.log('Meal plan stored for user:', userId);
        });
    });
};

module.exports = { storeExercisePlan, storeMealPlan };