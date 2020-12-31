const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const contr = require('../controllers/uporabnik')

router.get('/uporabnik/:id', contr.vrniUporabnikaPrekoId);
router.post('/spremeni',  contr.spremeniUporabnika);

router.post("/pozabilGeslo", contr.pozabilGeslo)


module.exports = router;