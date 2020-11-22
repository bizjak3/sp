const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', (req, res) => res.render('hmpg', {
    name: req.user.name

}));


module.exports = router;