const express = require('express');
const { Nutrition } = require('../models');
const { storeDietPlan } = require('../db/database');
const router = express.Router();

router.get('/nutrition/:dietType', async (req, res) => {
    try {
        const dietType = req.params.dietType;
        const nutritionData = await Nutrition.findAll({
            where: { dietType: dietType }
        });
        res.json(nutritionData);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post('/save-diet-plan', async (req, res) => {
    const userId = req.session.userId;
    const dietPlan = req.body.plan;
    
    try {
        await storeDietPlan(userId, dietPlan);
        res.json({ message: 'Diet plan saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save diet plan.' });
    }
});

module.exports = router;