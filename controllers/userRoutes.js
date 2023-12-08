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

        const user = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: password,
            dietPlan: dietPlan,
            exercisePlan: exercisePlan
        });

        //Handle Exercise Plan
        if (exercisePlan) {
            
        }
        
        // Handle Diet Plan
        if (dietPlan) {

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
