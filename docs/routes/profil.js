const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/profil', kontroler.profil);
router.get('/nastavitve', kontroler.nastavitve);
router.get('/moje_tekme', kontroler.moje_tekme);
router.get('/nastavitve_uredi', kontroler.nastavitve_uredi);

module.exports = router;