const express = require('express');
const router = express.Router();

const contr = require('../controllers/lastniProfil')

router.post('/prof', contr.najdiUporabnika);

router.post('/spremeni', contr.spremeniUporabnika);

module.exports = router;