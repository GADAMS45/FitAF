const express = require('express');
const router = express.Router();
const { fetchExerciseData } = require('./apiExercise');

router.get('/exercises', async (req, res) => {
    try {
        const category = req.query.category || 'fullbody';
        const exerciseData = await fetchExerciseData(category);

        res.json(exerciseData);
    } catch (error) {
        console.error('Erorr:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;