const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

var contrAvtentikacija = require('../controllers/avtentikacija')
var contrHomepage = require('../controllers/homepage')
var contrUporabnik = require('../controllers/uporabnik')
var controller = require('../controllers/tekma')

// Avtentikacija
router.post('/registracija', contrAvtentikacija.registracija); // Registracija
router.post('/prijava', contrAvtentikacija.prijava); // Prijava

// Homepage
router.get('/page/:p/:d', contrHomepage.homepage); // Pridobi tekme (pagination, filter)
router.get("/tekme", contrHomepage.tekme) // Pridobi stevilo vseh tekem
router.get("/markers", contrHomepage.markers) // Pridobi tekme za markerje

// Uporabnik
router.get('/uporabnik/:id', contrUporabnik.vrniUporabnikaPrekoId);
router.post('/spremeni',  contrUporabnik.spremeniUporabnika);
router.post("/pozabilGeslo", contrUporabnik.pozabilGeslo)

// Tekme
router.get('/tekma/:id/tekme', controller.podrobnostiTekme)
router.post('/novaTekma/:id', avtentikacija,  controller.ustvariTekmo);
router.post('/tekma/:id/spremeniTekmo',  controller.spremeniTekmo);
router.put('/prijaviSe/:id', avtentikacija, controller.prijaviSeNaTekmo);
router.put('/odjaviSe/:id', avtentikacija, controller.odjaviSeOdTekme);
router.get('/tekma/:id/izbrisi',  controller.izbrisiTekmo)
router.post('/tekma/:id/oceni/:user',  controller.oceniIgralce);
router.put('/tekma/:id/spremeniStatus', controller.spremeniStatus);

module.exports = router;