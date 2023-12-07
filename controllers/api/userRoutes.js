const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

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
