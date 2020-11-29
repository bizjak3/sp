const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

const Tekma = require('../models/Tekma');

router.get('/ustvari_tekmo', kontroler.ustvari_tekmo);

router.post('/ustvari_tekmo', (req, res) => {
    let {lat, lng, kraj, datum, ura, minIgralcev, maxIgralcev, prijavljeni, komentarji } = req.body;
    prijavljeni += 1;

    const newTekma = new Tekma({
        kreator: req.user._id,
        lat,
        lng,
        kraj,
        datum,
        ura,
        minIgralcev,
        maxIgralcev,
        prijavljeni,
        opis: komentarji,
        igralci: [req.user._id]
    });

    newTekma.save()
        .then(tekma => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
});

module.exports = router;