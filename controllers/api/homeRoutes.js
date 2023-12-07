const express = require('express');
const router = express.Router();
const { Exercise, Nutrition } = require('../../models');
const { ensureAuthenticated } = require('../../utils/auth');

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        const exercises = await Exercise.findAll({
            where: { userId: req.user.id }
        });

        const nutrition = await Nutrition.findOne({
            where: { userId: req.user.id }
        });

        const exerciseData = exercises.map(exercise => exercise.get({ plain: true }));
        const nutritionData = nutrition ? nutrition.get({ plain: true }) : null;

        res.render('dashboard', {
            exercises: exerciseData,
            nutrition: nutritionData
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).render('error', { error: err });
    }
});

module.exports = router;
