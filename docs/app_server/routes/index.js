const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const kontroler = require('../controllers/controller');
// DA ni treba nardit vsakic login
/*
router.get('/', ensureAuthenticated, (req, res) =>
    res.render('hmpg', {
        name: req.user.name,
        surname: req.user.surname
    })
);

 */

router.get('/', (req, res) =>
    res.render('hmpg', {
        name: 'Poskus',
        surname: 'Poskus'
    })
);


module.exports = router;