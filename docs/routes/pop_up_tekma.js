const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

router.get('/pop_up_tekma', kontroler.pop_up_tekma);

module.exports = router;