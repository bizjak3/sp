const express = require('express');
const router = express.Router();
const Tekma = require('../models/Tekma')
const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const controller = require('../controllers/tekma')

router.get('/tekma/:id/tekme', controller.podrobnostiTekme)

router.post('/novaTekma/:id', avtentikacija, controller.ustvariTekmo);

router.post('/tekma/:id/spremeniTekmo', avtentikacija, controller.spremeniTekmo);

router.put('/prijaviSe/:id', avtentikacija, controller.prijaviSeNaTekmo);
router.put('/odjaviSe/:id', avtentikacija, controller.odjaviSeOdTekme);

router.get('/tekma/:id/izbrisi', avtentikacija, controller.izbrisiTekmo)

router.post('/tekma/:id/oceni/:user', avtentikacija, controller.oceniIgralce);

router.put('/tekma/:id/spremeniStatus', controller.spremeniStatus);

module.exports = router;