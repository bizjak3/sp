const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const controller = require('../controllers/tekma')

router.get('/tekma/:id/tekme', controller.podrobnostiTekme)

router.post('/novaTekma/:id',  controller.ustvariTekmo);

router.post('/tekma/:id/spremeniTekmo',  controller.spremeniTekmo);

router.put('/prijaviSe/:id',  controller.prijaviSeNaTekmo);
router.put('/odjaviSe/:id',  controller.odjaviSeOdTekme);

router.get('/tekma/:id/izbrisi',  controller.izbrisiTekmo)

router.post('/tekma/:id/oceni/:user',  controller.oceniIgralce);

router.put('/tekma/:id/spremeniStatus', controller.spremeniStatus);

module.exports = router;