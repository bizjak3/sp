
const express = require('express');
const router = express.Router();

const kontroler = require('../controllers/controller');

const Tekma = require('../models/Tekma');

router.get('/db', kontroler.db)

router.post('/db', (req, res) => {

    var tekme = []

    tekme[0] = new Tekma({kraj: 'Ljubljana', datum: "10 12 2020", ura: '15 - 30', minIgralcev: 6, maxIgralcev: 10, prijavljeni: 4});
    tekme[1] = new Tekma({kraj: 'Maribor', datum: "20 12 2020", ura: '20 - 30', minIgralcev: 10, maxIgralcev: 10, prijavljeni: 1});
    tekme[2] = new Tekma({kraj: 'Murska Sobota', datum: "5 12 2020", ura: '09 - 50', minIgralcev: 10, maxIgralcev: 10, prijavljeni: 8});
    tekme[3] = new Tekma({kraj: 'Trst', datum: "2 12 2020", ura: '10 - 00', minIgralcev: 10, maxIgralcev: 10, prijavljeni: 5});

    var i;
    for (i = 0; i < tekme.length; i++) {
        tekme[i].save();
    }

    res.redirect('/')

});

router.post('/db_izbrisi', (req, res) => {
    Tekma.deleteMany({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/');
            }
        }
    );
})

module.exports = router;

