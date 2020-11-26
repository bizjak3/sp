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
        ustvari_tekmo: true,
        urejamo: false,
        tekma : {
            kreator : "Janez Novak",
            lokacija : "Ljubljana, Rožna cesta 13",
            datum : "6. 9. 2020",
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
    db
};