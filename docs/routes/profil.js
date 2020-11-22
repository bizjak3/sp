const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/profil', kontroler.profil);

module.exports = router;