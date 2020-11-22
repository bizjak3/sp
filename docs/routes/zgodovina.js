const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/zgodovina', kontroler.zgodovina);

module.exports = router;