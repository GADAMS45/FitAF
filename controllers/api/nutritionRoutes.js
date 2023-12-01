const express = require('express');
const { Nutrition } = require('../../models');
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

module.exports = router;
