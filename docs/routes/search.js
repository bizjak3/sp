const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const kontroler = require('../controllers/controller');

router.get('/search', ensureAuthenticated, kontroler.search);
router.get('/search:search_niz', ensureAuthenticated, kontroler.search);


module.exports = router;