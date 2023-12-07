// Import necessary modules and libraries
const passport = require('passport'); // Passport for authentication
const { User } = require('../../models'); // Sequelize User model
const bcrypt = require('bcrypt'); // Library for hashing passwords
const { Exercise, Nutrition } = require('../../models');

//Dashboard route to display exercise and diet
router.get('/dashboard', async (req, res) => {
  if (!req.user) {
    res.redirect('users/login'); // Redirect to login if not authenticated
    return;
  }

  try {
    const exercises = await Exercise.findAll({
      where: { userId: req.user.id }
    });
    const nutrition = await Nutrition.findOne({
      where: { userId: req.user.id }
    });

    res.render('dashboard', {
      exercises: exercises.map(exercise => exercise.get({ plain: true })),
      nutrition: nutrition.get({ plain: true })
    });
  } catch (error) {
    console.error('Error fetching dashboard data: ', error);
    res.status(500).send('Something went wrong');
  }
});
// Register route
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
        });
        res.redirect('/users/login');
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');

});

module.exports = router;
