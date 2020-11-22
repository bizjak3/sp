const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/ustvari_tekmo', kontroler.ustvari_tekmo);

module.exports = router;