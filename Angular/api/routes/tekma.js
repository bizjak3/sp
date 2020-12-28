const express = require('express');
const router = express.Router();
const Tekma = require('../models/Tekma')

const controller = require('../controllers/tekma')

router.get('/tekma/:id/tekme', controller.podrobnostiTekme)

router.post('/novaTekma/:id', controller.ustvariTekmo);

module.exports = router;