const express = require('express');
const router = express.Router();

const contr = require('../controllers/uporabnik')

router.get('/uporabnik/:id', contr.vrniUporabnikaPrekoId);
router.post('/spremeni', contr.spremeniUporabnika);


module.exports = router;