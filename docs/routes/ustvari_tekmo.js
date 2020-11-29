const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

const Tekma = require('../models/Tekma');

router.get('/ustvari_tekmo', kontroler.ustvari_tekmo);

router.post('/ustvari_tekmo', kontroler.ustvari_tekmo_POST);

module.exports = router;