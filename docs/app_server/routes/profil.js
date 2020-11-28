const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/profil', kontroler.profil);
router.get('/nastavitve', kontroler.nastavitve);
router.get('/moje_tekme', kontroler.moje_tekme);
router.get('/nastavitve_uredi', kontroler.nastavitve_uredi);
router.get('/profil_ostali', kontroler.profil_ostali);

router.post('/nastavitve_uredi',kontroler.nastavitve_uredi_POST);
router.post('/nastavitve',kontroler.nastavitve_POST);
router.post('/nastavitve_osebni',kontroler.nastavitve_osebni_POST);

module.exports = router;