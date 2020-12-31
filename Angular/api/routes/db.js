
const express = require('express');
const router = express.Router();

const Tekma = require('../models/Tekma');
const User = require('../models/User');

const bcrypt = require('bcrypt');


router.post('/db', (req, res, done) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("geslo123", salt, (err, hash) => {
            if (err) throw err;
            uporabnik = new User({name: "Janez",
                                  surname: "Novak",
                                  email: "jn@tapnplay.com",
                                  password: hash,
                                  });
            uporabnik.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            let tekma = new Tekma({
                kreator: uporabnik._id,
                lat: 45.9600605108642,
                lng: 13.674863585679143,
                kraj: "Med trtami, 5000, Kromberk, Nova Gorica",
                datum: "2021-1-1",
                ura: "15:00",
                minIgralcev: 4,
                maxIgralcev: 12,
                prijavljeni: 4,
                igralci: [uporabnik._id],
                status: "prijave"
            });
            tekma.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            User.updateOne(
                { _id: uporabnik._id},
                { $push: { tekme: tekma._id } },
                done
            );
        });
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("password1", salt, (err, hash) => {
            if(err) throw err;
            uporabnik = new User({name: "Ana",
                                  surname: "Novak",
                                  email: "an@tapnplay.com",
                                  password: hash,
                                  });
            uporabnik.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            let tekma = new Tekma({
                kreator: uporabnik._id,
                lat: 46.06306748675555,
                lng: 14.493591146862846,
                kraj: "5 Vodnikova cesta, 1000, Ljubljana",
                datum: "2020-12-25",
                ura: "14:00",
                minIgralcev: 4,
                maxIgralcev: 12,
                prijavljeni: 1,
                opis: "toplo se oblecite",
                igralci: [uporabnik._id],
                status: "prijave"
            });
            tekma.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            User.updateOne(
                { _id: uporabnik._id},
                { $push: { tekme: tekma._id } },
                done
            );
        });
    });

    res.redirect('/')

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

