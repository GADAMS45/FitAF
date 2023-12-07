const express = require('express');
const router = express.Router();
const { storeExercisePlan } = require('./api/database');
const Exercise = require('../../models/exercise');

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

router.post('/save-exercise-plan', async (req, res) => {
  const userId = req.session.userId;
  const exercisePlan = req.body.plan;
  
  try {
      await storeExercisePlan(userId, exercisePlan);
      res.json({ message: 'Exercise plan saved successfully.' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to save exercise plan.' });
  }
});

module.exports = router;
