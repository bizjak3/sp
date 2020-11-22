const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/nastavitve', kontroler.nastavitve);

module.exports = router;