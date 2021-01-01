
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

const Tekma = require('../models/Tekma');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const { isValidObjectId } = require('mongoose');


router.post('/db', (req, res, done) => {
    var geslo = "admin123"
    const uporabnik = new User();
    uporabnik.ime = "Admin"
    uporabnik.priimek = "Admin"
    uporabnik.email = "admin@admin.com"
    uporabnik.admin = true;
    uporabnik.nastaviGeslo(geslo);
    uporabnik.save(napaka => {
        if (napaka) {
            if (napaka.code == 11000) {
                res.status(400).json({"sporočilo": "Uporabnik s tem elektronskim naslovom je že registriran"});
            }
            else {
                res.status(500).json({"sporočilo": napaka});
            }
            } else {
                res.status(200).json({"žeton": uporabnik.generirajJwt()});
            }
      });
      let tekma = new Tekma({  
        kreator: "Kreator tekme",
        lat: 46.0503162990623,
        lng: 14.468446969985964,
        kraj: "Fakulteta za Računalništvo in Informatiko",
        datum: "2022-01-10",
        ura: "15:00",
        minIgralcev: 4,
        maxIgralcev: 12,
        prijavljeni: 4,
        igralci: ["Kreator tekme"],
        status: "prijave"
    });
    
    tekma._id = "aaaaaaaaaaaaaaaaaaaaaa5a"
    tekma.save()

});



router.delete('/db_izbrisi', (req, res) => {
    Tekma.deleteMany({}, function(err) {
            if (err) {
                console.log(err)
            }
        }
    );
    User.deleteMany({}, function(err) {
        if(err) {
            console.log(err);
        }
    });
    res.status(200).json({sporocilo: "Uspsno izbrisana baza"})
})


router.post('/db30', (req, res) => {

    console.log(getRandomInRange(45, 47, 1))

    for (var i = 1; i < 31; i++) {
        var datum = "2021-1-" + i.toString()
        if (i < 10) {
            var datum = "2021-1-0" + i.toString()
        }
        let tekma = new Tekma({
            kreator: "Kreator " + i,
            lat: getRandomInRange(45, 47, 1),
            lng: getRandomInRange(13, 16, 1),
            kraj: "Kraj " + i,
            datum: datum,
            ura: "15:00",
            minIgralcev: 4,
            maxIgralcev: 12,
            prijavljeni: 4,
            igralci: [i],
            status: "prijave"
        });
        tekma.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
})

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

module.exports = router;

