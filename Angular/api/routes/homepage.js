const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const contrHomepage = require('../controllers/homepage')



router.get('/page/:p', contrHomepage.homepage);

router.get("/tekme", contrHomepage.tekme)

router.get("/markers", contrHomepage.markers)

module.exports = router;