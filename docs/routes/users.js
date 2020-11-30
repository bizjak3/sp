const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

//User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

const kontroler = require('../controllers/controller');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login', {title: "Prijava"}));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register', {title: "Registraicja"}));


router.post('/register', kontroler.register)

//Login handle

router.post('/pozabil_geslo', kontroler.pozabil_geslo);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Uspešno ste se odjavili');
    res.redirect('/login');
});

module.exports = router;