const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

const Tekma = require('../models/Tekma');

router.get('/ustvari_tekmo', kontroler.ustvari_tekmo);

router.post('/ustvari_tekmo', (req, res) => {
    const { kraj, datum, ura, minIgralcev, maxIgralcev, prijavljeni, komentarji } = req.body;

    const newTekma = new Tekma({
        kreator: "ajdi",
        kraj,
        datum,
        ura,
        minIgralcev,
        maxIgralcev,
        prijavljeni,
        opis: komentarji,
        igralci: ["ajdi"]
    });

    newTekma.save()
        .then(tekma => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
});

module.exports = router;