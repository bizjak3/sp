const express = require('express');
const router = express.Router();

const contr = require('../controllers/avtentikacija');

router.post('/registracija', contr.registracija);
router.post('/prijava', contr.prijava);

module.exports = router;