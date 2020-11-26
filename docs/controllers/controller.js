const mongoose = require('mongoose');

const Tekma = require('../models/Tekma');

var apiParametri = {
  streznik: 'http://localhost:' + (process.env.PORT || 8080)
};

const axios = require('axios').create({
  baseURL: apiParametri.streznik,
  timeout: 5000
});

var moje_tekme = (req, res) => {
    res.render('moje_tekme',{
        moje_tekme: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3
    });
};

var profil = (req, res) => {
    res.render('profil',{
        profil: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 1
    });
};

var nastavitve = (req, res) => {
    res.render('nastavitve',{
        nastavitve: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3,
        telefon: '010569412',
        geslo: 'Security? NO',
        smsOdpade: true,
        emailOdpade: true,
        smsPrihaja: false,
        emailPrihaja: true,
        emailDrugi: false,
        telDrugi: true
    });
};

var nastavitve_uredi = (req, res) => {
    res.render('nastavitve_uredi',{
        nastavitve_uredi: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3,
        telefon: '010569412',
        geslo: 'Security? NO',
        smsOdpade: true,
        emailOdpade: true,
        smsPrihaja: false,
        emailPrihaja: true,
        emailDrugi: false,
        telDrugi: true
    });
};

var pop_up_tekma = (req, res) => {
    res.render('pop_up_tekma', {
        //ustvari_tekmo: true,
        urejamo: false,
        tekma : {
            kreator : "Janez Novak",
            lokacija : "Ljubljana, Rožna cesta 13",
            datum : "8. 9. 2020",
            ura : "4:20",
            steviloIgralcev: "7",
            maksimalnoSteviloIgralcev: "16",
            opis : "idk nigga",
            igralci : [
                {
                    ime : "janez",
                    rating : "5"
                },
                {
                    ime : "Robi",
                    rating : "4.7"
                }
            ]
        }
    });
};

const podrobnostiTekme = (req, res) => {
  pridobiPodrobnostiTekme(req, res, (req, res, vsebina) => {
    prikaziPodrobnostiTekme(req, res, vsebina);
  });
};

const pridobiPodrobnostiTekme = (req, res, povratniKlic) => {
    let idTekme = req.params.id;
    console.log(idTekme);
    Tekma.findOne({_id: idTekme}).lean().exec({}, function (err, tekma) {
            res.render('pop_up_tekma', {
                layout: 'main',
                urejamo: true,
                name: 'Janezz',
                surname: 'Novakk',
                tekma: tekma,
            });
        });
};

const prikaziPodrobnostiTekme = (req, res, podrobnostiTekme) => {
  res.render('lokacija-podrobnosti', {
    title: Tekma,
    glavaStrani: {
      naslov: podrobnostiLokacije.naziv
    },
    stranskaOrodnaVrstica: {
      kontekst: 'je na EduGeoCache, ker je zanimiva lokacija, ki si jo lahko ogledate, ko ste brez idej za kratek izlet.',
      poziv: 'Če vam je lokacija všeč, ali pa tudi ne, dodajte svoj komentar in s tem pomagajte ostalim uporabnikom pri odločitvi.'
    },
    tekma: podrobnostiTekme
  });
};

var ustvari_tekmo = (req, res) => {
    res.render('ustvari_tekmo', {
        ustvari_tekmo: true
    });
};

var homepage = (req, res) => {
    const Tekma = require('../models/Tekma');
    Tekma.find({}).lean().exec({}, function (err, tekma) {
        res.render('hmpg', {
            layout: 'main',
            homepage: true,
            name: 'Janezz',
            surname: 'Novakk',
            tekma: tekma,
        });
    });
};

var db = (req, res) => {
    res.render('db', {
        ustvari_tekmo: true
    });
};

module.exports = {
    pop_up_tekma,
    ustvari_tekmo,
    nastavitve,
    nastavitve_uredi,
    profil,
    moje_tekme,
    homepage,
    db,
    podrobnostiTekme
};