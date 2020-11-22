const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/', kontroler.homepage);

module.exports = router;