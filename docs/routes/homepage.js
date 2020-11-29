const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const kontroler = require('../controllers/controller');


router.get('/', ensureAuthenticated, kontroler.homepage);


module.exports = router;

//dodal rihard
/*
router.post('/', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}

router.post('/login', (req, res, next) => {
    (req, res, next);
});
*/
