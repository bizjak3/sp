const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

//User model
const User = require('../models/User')

router.get('/login', (req, res) => res.render('login'));


router.get('/register', (req, res) => res.render('register'));


router.post('/register', (req, res) => {
    const { name, surname, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (password !== password2) {
        errors.push(1);
        req.flash('error', 'Gesli se ne ujemata');
    }

    if (password.length < 6) {
        errors.push(1);
        req.flash('error', 'Geslo mora vsebovati vsaj 6 znakov')
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            surname,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    //User exists
                    errors.push(1);
                    req.flash('error', 'Uporabnik ze obstaja');
                    res.render('register', {
                        errors,
                        name,
                        surname,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        surname,
                        email,
                        password
                    })
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                req.flash('success', 'Uspesno ste se registrirali')
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err))
                    }))
                }
            });
    }
});

//Login handle

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router;