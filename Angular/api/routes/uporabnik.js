const express = require('express');
const router = express.Router();

const contr = require('../controllers/uporabnik')

router.post('/prof', contr.najdiUporabnika);

router.post('/spremeni', contr.spremeniUporabnika);

router.post('/uporabnik', contr.vrniUporabnikaPrekoId);

module.exports = router;