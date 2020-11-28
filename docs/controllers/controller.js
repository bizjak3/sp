const mongoose = require('mongoose');
const Tekma = require('../models/Tekma');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const posljiEmail = (email,subject,text) => {
    const msg = {
        to: email.toString(),
        from: 'testektesto@gmail.com', // Use the email address or domain you verified above
        subject: subject.toString(),
        text: text.toString(),
    };
//ES6
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });
}

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
        ocena: 1,
        user: req.user
    });
};

var profil_ostali = (req, res) => {
    res.render('profil_ostali',{
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
        telDrugi: true,
        user: req.user
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
        telDrugi: true,
        user: req.user
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
    let urejanje = req.params.urejanje;

    Tekma.findOne({_id: idTekme}).exec((err, tekma) => {
        if(err){
            console.log(err);
            res.status(400);
        }
        let playerIDs = tekma.igralci;
        User.find({_id: playerIDs}).lean().exec((err, igralci) => {
            if(err){
                console.log(err);
                res.status(400);
            }
            let sodelujoci = [];
            let pridruzen = false;
            igralci.forEach(element => {
                sodelujoci.push({   id: element._id,
                                    name: element.name,
                                    surname: element.surname
                                    });
                if(element._id == "5fc28813120bfa0ab6f59887"){
                    pridruzen = true;
                }
            });
            res.render('pop_up_tekma', {
                layout: 'main',
                urejamo: false,
                pridruzen: pridruzen,
                name: 'Janezz',
                surname: 'Novakk',
                tekma: tekma,
                sodelujoci: sodelujoci
            });
        });
    });
};

const urediTekmo = (req, res, povratniKlic) => {
    let idTekme = req.params.id;
    Tekma.findOne({_id: idTekme}).exec({}, function (err, tekma){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        let playerIDs = tekma.igralci;
        User.find({_id: playerIDs}).lean().exec({}, function (err, igralci){
            if(err){
                console.log(err);
                res.redirect('/');
            }
            let sodelujoci = [];
            let pridruzen = false;
            igralci.forEach(element => {
                sodelujoci.push({   id: element._id,
                                    name: element.name,
                                    surname: element.surname
                                    });
                if(element._id == "5fc28813120bfa0ab6f59887"){
                    pridruzen = true;
                }
            });
            res.render('pop_up_tekma', {
                layout: 'main',
                urejamo: true,
                pridruzen: pridruzen,
                name: 'Janezz',
                surname: 'Novakk',
                tekma: tekma,
                sodelujoci: sodelujoci
            });
        });
    });
};

const urediTekmo_POST = (req, res) => {
    const {datum, ura, komentarji} = req.body;
    let idTekme = req.params.id;
    Tekma.findOne({_id: idTekme}, function (err, tekma) {
        tekma.datum = datum;
        tekma.ura = ura;
        tekma.opis = komentarji;
        tekma.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    res.redirect('/pop_up_tekma/' + idTekme);
};

const izbrisiTekmo = (req, res) => {
    let idTekme = req.params.id;
    Tekma.deleteOne({_id: idTekme}, function (err){
        if(err){
            console.log(err);
        }
    });
    res.redirect('/');
};

const pridruziSeTekmi = (req, res, done) => {
    let idTekme = req.params.id;
    Tekma.updateOne(
         { _id: idTekme },
         { $push: { igralci: "5fc28813120bfa0ab6f59887" } },
         done
    );
    Tekma.updateOne(
         { _id: idTekme },
         { $inc: { prijavljeni: 1}},
         done
    );

    res.redirect('/pop_up_tekma/' + idTekme);
};

const odjaviOdTekme = (req, res, done) => {
    let idTekme = req.params.id;
    Tekma.updateOne(
         { _id: idTekme },
         { $pull: { igralci: "5fc28813120bfa0ab6f59887" } },
         done
    );
    Tekma.updateOne(
         { _id: idTekme },
         { $inc: { prijavljeni: -1}},
         done
    );
    res.redirect('/pop_up_tekma/' + idTekme);
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
            surname: 'Novak',
            tekma: tekma,
            user: req.user
        });
    });
};

var db = (req, res) => {
    res.render('db', {
        ustvari_tekmo: true
    });
};

const nastavitve_uredi_POST = (req, res) => {
    const { id, ime, priimek, email, telefon, geslo, geslo1 } = req.body;
    let errors = [];

    if(geslo !== geslo1){
        errors.push(1);
        req.flash('error', 'Gesli se ne ujemata');
    }

    if (geslo.length < 6) {
        errors.push(1);
        req.flash('error', 'Geslo mora vsebovati vsaj 6 znakov')
    }

    if (errors.length > 0) {
        res.render('nastavitve_uredi', {
            errors,
            ime,
            priimek,
            email,
            telefon,
            geslo,
            geslo1
        })
    }else{
        User.findOne({_id: id}, function (err, user) {
            user.name = ime;
            user.surname = priimek;
            user.email = email;
            user.telefon = telefon;

            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(geslo, salt, (err, hash) => {
                    if (err) throw err;

                    user.password = hash;

                    user.save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                    });

                }));
        });
        posljiEmail(email,'Sprememba nastavitev','Nastavitve uspešno spremenjene');
        res.render('profil');
    }

}

const nastavitve_POST = (req, res) => {
    const { smsOdpoved, emailOdpoved, smsPrihajujoča, emailprihajujoče} = req.body;
    let errors = [];

    res.render('nastavitve_uredi', {
        smsOdpoved,
        emailOdpoved,
        smsPrihajujoča,
        emailprihajujoče
    })
}

const nastavitve_osebni_POST = (req,res) =>{

    const { telPokazi, emailPokazi} = req.body;
    let errors = [];

    res.render('nastavitve_uredi', {
        telPokazi,
        emailPokazi
    })

}

const pozabil_geslo =  (req, res) => {
    const { email } = req.body;

    let novoGeslo = Math.random().toString(36).substring(1);

    console.log(email)

    User.findOne( {email: email}, function(err, user) {
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(novoGeslo, salt, (err, hash) => {
                if (err) throw err;

                user.password = hash;

                user.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                });

            }));



    })

    posljiEmail(email,'Sprememba gesla', "Novo geslo je: " + novoGeslo);
    res.redirect("/login");
}

module.exports = {
    pop_up_tekma,
    ustvari_tekmo,
    nastavitve,
    nastavitve_uredi,
    profil,
    profil_ostali,
    moje_tekme,
    homepage,
    db,
    nastavitve_uredi_POST,
    nastavitve_osebni_POST,
    nastavitve_POST,
    podrobnostiTekme,
    urediTekmo,
    urediTekmo_POST,
    izbrisiTekmo,
    pridruziSeTekmi,
    odjaviOdTekme,
    pozabil_geslo
};