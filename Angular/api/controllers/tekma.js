const Tekma = require('../models/Tekma')
const User = require('../models/User')
var weather = require('openweather-apis');
weather.setUnits('metric');
weather.setAPPID('2d46165b2a3d0734271c8271f8c9e8fa');
weather.setLang('sl');

var podrobnostiTekme = (req, res) => {
    //console.log("parametri: " + req.params.id)
    Tekma.find({
        _id: req.params.id
    }).then((tekma) => {
        weather.setCoordinate(tekma[0].lat, tekma[0].lng);
        weather.getAllWeather(function(err, vreme) {
            res.send({tekma: tekma[0], vreme: vreme})
        })
        
    })
}

var ustvariTekmo = (req, res) => {

    
    let {lat, lng, kraj, datum, ura, min, max, prijavljeni, opombe } = req.body;

    if (!kraj || !datum || !ura) {
        return res.status(400).json({sporocilo: "Prosim vnesite kraj, datum in uro tekme", status: "danger"})
    }

    prijavljeni += 1;

    let d = new Date(datum); //dd-mm-YYYY
    let t = new Date();

    

    t.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);


    if(d < t) {
        return res.status(400).json({sporocilo: "Prosim preveri vnešeni datum", status: "danger"});
    }else if(d + "" == t + ""){
        var now = new Date();

        if (now.getHours() + ":" + now.getMinutes() > ura + "") {
            return res.status(400).json({sporocilo: "Prosim preveri uro", status: "danger"});;
        }
    }

    User.findById(req.params.id, (napaka, uporabnik) => {

        if (napaka) {
            res.status(404)
        }  else {
            var user = {
                id: req.params.id,
                ime: uporabnik.ime,
                priimek: uporabnik.priimek
            }
            const newTekma = new Tekma({
                kreator: user,
                lat: lat,
                lng: lng,
                kraj: kraj,
                datum: datum,
                ura: ura,
                minIgralcev: min,
                maxIgralcev: max,
                prijavljeni: prijavljeni,
                opis: opombe,
                igralci: [user],
                status: "prijave"
            });
        
            newTekma.save()
                .then(tekma => {
                    var podatkiTekme = {
                        id: tekma.id,
                        kraj: tekma.kraj,
                        datum: tekma.datum,
                        ura: tekma.ura
                    }
                    uporabnik.tekme.push(podatkiTekme)
                    uporabnik.save()
                    
                    res.status(200).send({sporocilo: "Tekma uspešno ustvarjena", status: "success"})
                })
                .catch(err => {
                    res.status(500).send(err)
             });
        }
    })

    
}

var spremeniTekmo = (req, res) => {
    const {datum, ura, opis} = req.body;
    Tekma.findOne({_id: req.params.id}, function (err, tekma) {
        if(err){
            console.log(err);
            res.send({sporocilo: err})
        }else{
            if(tekma.status == 'prijave'){
                tekma.datum = datum;
                tekma.ura = ura;
                tekma.opis = opis;
                tekma.save(function (err) {
                    if (err) {
                        return res.status(500).json({sporocilo: err})
                    }
                });
                res.status(201).send({sporocilo: "Uspesno spremenjeni podatki"})
            }
        }
    });
}

var prijaviSeNaTekmo = (req, res) => {
    let idTekme = req.params.id;
    let idUser = req.body.id
    User.findById(idUser, (err, uporabnik) => {
        var user = {
            id: idUser,
            ime: uporabnik.ime,
            priimek: uporabnik.priimek
        }
        Tekma.findById(idTekme, (err, tekma) => {
            if(tekma.status === "prijave"){
                var jePrijavljen = false;
                tekma.igralci.forEach(element => {
                    if(element.id + "" == user.id + ""){
                        jePrijavljen = true;
                    }
                })
                if(!jePrijavljen){

                    var podatkiTekme = {
                        id: tekma.id,
                        kraj: tekma.kraj,
                        datum: tekma.datum,
                        ura: tekma.ura
                    }

                    uporabnik.tekme.push(podatkiTekme)
                    tekma.igralci.push(user)
                    tekma.prijavljeni++;
                    tekma.save()
                    uporabnik.save()
                    return res.status(200).send({sporocilo: "Uspešna prijava"})
                }
            }
        })
    });
}

var odjaviSeOdTekme = (req, res) => {
    let idTekme = req.params.id;
    let idUser = req.body.id
    User.findById(idUser, (err, uporabnik) => {
        var user = {
            id: idUser,
            ime: uporabnik.ime,
            priimek: uporabnik.priimek
        }

        Tekma.findById(idTekme, (err, tekma) => {
            if(tekma.status == "prijave"){
                var jePrijavljen = false;

                tekma.igralci.forEach(element => {
                    if(element.id + "" == user.id + ""){
                        jePrijavljen = true;
                    }
                })
                if(jePrijavljen){
                    
                    for (var i = 0; i < tekma.igralci.length; i++) {
                        if (tekma.igralci[i].id === user.id) {
                            tekma.igralci.splice(i, 1)
                        }
                    }

                    for (var i = 0; i < uporabnik.tekme.length; i++) {
                        if (uporabnik.tekme[i].id === idTekme) {
                            uporabnik.tekme.splice(i, 1)
                        }
                    }
                    
                    tekma.prijavljeni--;
                    tekma.save()
                    uporabnik.save()
                    return res.status(200).send({sporocilo: "Uspešna odjava"})
                }
            }
        })
    });
}

var izbrisiTekmo = (req, res) => {
    User.find({"tekme.id": req.params.id}).then((uporabniki) => {
        for (var i = 0; i < uporabniki.length; i++) {
            for (var j = 0; j < uporabniki[i].tekme.length; j++) {
                console.log(uporabniki[i].tekme[j].id)
                if (uporabniki[i].tekme[j].id === req.params.id) {
                    uporabniki[i].tekme.splice(j, 1)
                    uporabniki[i].save()
                }
            }
        }
    })
    Tekma.deleteOne({_id: req.params.id}, function (err){
        if(err){
            res.status(500).json({sporocilo: err})
        } else {
            res.status(204)
        }
    });
}

var oceniIgralce = (req, res, done) => {
    const ocene = req.body.ocene;
    console.log(ocene);
    Tekma.findOne( {_id: req.params.id}, (err, tekma) => {
        Tekma.updateOne(
            {_id: req.params.id},
            { $push: { zeOcenili: req.params.user}},
            done
        );
        let playerIDs = tekma.igralci.map(a => a.id);
        console.log(playerIDs);
        User.find({_id: playerIDs}, function (err, igralci){
            if(err){
                console.log(err);
            }
            let i = 0;
            igralci.map(user => {
                if(ocene[i] >= 1 || ocene[i] <= 5){
                    let trenutnaOcena = user.ocena;
                    let trenutnoSteviloOcen = user.steviloOcen;

                    let koncnaOcena = trenutnaOcena + (ocene[i] - trenutnaOcena) / trenutnoSteviloOcen;
                    let koncnoStevilo = trenutnoSteviloOcen + 1;
                    user.ocena = koncnaOcena;
                    user.steviloOcen = koncnoStevilo;
                    user.save();
                    i++;
                }
            });

        });
    })
    res.status(201).send({sporocilo: "oceni"});
}

var spremeniStatus = (req, res) => {
    Tekma.findOne({_id: req.params.id}, (err, tekma) => {
        if(err){
            return res.status(500).json({sporocilo: err})
        }
        tekma.status = "zakljucena";
        tekma.save();
        res.status(201).send({sporocilo: "status"});
    });
}

module.exports = {
    podrobnostiTekme,
    ustvariTekmo,
    spremeniTekmo,
    prijaviSeNaTekmo,
    odjaviSeOdTekme,
    izbrisiTekmo,
    oceniIgralce,
    spremeniStatus
}