const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Exercise, Nutrition } = require('../models');
const { fetchExerciseData, selectWeeklyExercises } = require('./api/apiExercise');
const { fetchRecipeData } = require('./api/apiNutrition');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, dietPlan, exercisePlan } = req.body;

        if (!email || !password || !name) {
            return res.status(400).send('Missing required fields.');
        }

        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).send('User with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        //Handle Exercise Plan
        if (exercisePlan) {
            const exerciseData = await fetchExerciseData(exercisePlan);
            const weeklyExerciseSchedule = selectWeeklyExercises(exerciseData);
        
            // Assuming weeklyExerciseSchedule is an array of objects with day and exercise details
            for (const dayPlan of weeklyExerciseSchedule) {
                await ExercisePlan.create({
                    userId: user.id,
                    day: dayPlan.day,
                    exercises: JSON.stringify(dayPlan.exercises)
                });
            }
        }
        
        // Handle Diet Plan
        if (dietPlan) {
            const dietData = await fetchRecipeData(dietPlan);
        
            // Save dietData to the database
            await DietPlan.create({
                userId: user.id,
                planDetails: JSON.stringify(dietData)
            });
        }

        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).render('error', { error: error.message });
    }
});



router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
