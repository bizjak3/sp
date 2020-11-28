const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

const Tekma = require('../models/Tekma');

router.get('/ustvari_tekmo', kontroler.ustvari_tekmo);

router.post('/ustvari_tekmo', (req, res) => {
    let { kraj, datum, ura, minIgralcev, maxIgralcev, prijavljeni, komentarji } = req.body;
    prijavljeni += 1;
    const newTekma = new Tekma({
        kreator: "ajdi",
        kraj,
        datum,
        ura,
        minIgralcev,
        maxIgralcev,
        prijavljeni,
        opis: komentarji,
        igralci: ["5fc27b713c481de7f329677b"]
    });

    newTekma.save()
        .then(tekma => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
});

module.exports = router;