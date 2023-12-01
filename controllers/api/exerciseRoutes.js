const express = require('express');
const { Exercise } = require('../../models');
const router = express.Router();

router.get('/exercises/:exerciseType', async (req, res) => {
    try {
      const exerciseType = req.params.exerciseType;
      const exerciseData = await Exercise.findAll({
        where: { exerciseType: exerciseType }
      });
  
      res.json(exerciseData);
    } catch (error) {
      res.status(500).send('Server Error');
    }
});

module.exports = router;
