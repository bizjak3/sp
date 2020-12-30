const express = require('express');
const router = express.Router();
const Tekma = require('../models/Tekma')

const controller = require('../controllers/tekma')

router.get('/tekma/:id/tekme', controller.podrobnostiTekme)

router.post('/novaTekma/:id', controller.ustvariTekmo);

router.post('/tekma/:id/spremeniTekmo', controller.spremeniTekmo);

router.put('/tekma/:id/prijaviSe/:user', controller.prijaviSeNaTekmo);
router.put('/tekma/:id/odjaviSe/:user', controller.odjaviSeOdTekme);

router.get('/tekma/:id/izbrisi', controller.izbrisiTekmo)

module.exports = router;