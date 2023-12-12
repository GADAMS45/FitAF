const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../utils/auth');
const { fetchExerciseData, selectWeeklyExercises } = require('./api/apiExercise');
const { fetchRecipeData } = require('./api/apiNutrition');

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        console.log('Registering user:', req.body);

        // Get User from Id
        let user = req.user;

        const exerciseData = await fetchExerciseData(user.exercisePlan);
        const weeklyExerciseSchedule = selectWeeklyExercises(exerciseData);
        let items = Object.values(weeklyExerciseSchedule).map(i => i[0])

        const dietData = await fetchRecipeData(user.dietPlan);

        res.render('dashboard', {
            exercises: items,
            nutrition: Object.values(dietData)
        });
    } catch (err) {
        console.log('Registering user:', req.body);

        console.error('Error fetching dashboard data:', err);
        res.status(500).render('error', { error: err });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;