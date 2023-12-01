const express = require('express');
const router = express.Router();
const { fetchRecipeData } = require('./apiNutrition');

router.get('/recipes', async (req, res) => {
    try {
        const searchQuery = req.query.q || 'pasta';
        const recipeData = await fetchRecipeData(searchQuery);

        res.json(recipeData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;