const Tekma = require('../models/Tekma')
const User = require('../models/User')

var podrobnostiTekme = (req, res) => {
    //console.log("parametri: " + req.params.id)
    Tekma.find({
        _id: req.params.id
    }).then((tekma) => {
        res.send(tekma)
    })
}

var ustvariTekmo = (req, res) => {

    
    let {lat, lng, kraj, datum, ura, min, max, prijavljeni, opombe } = req.body;

    prijavljeni += 1;

    let d = new Date(datum); //dd-mm-YYYY
    let t = new Date();

    t.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);

    if(d < t) {
        return;
    }else if(d + "" == t + ""){
        var now = new Date();

        if (now.getHours() + ":" + now.getMinutes() > ura + "") {
            return;
        }
    }

    User.findById(req.params.id, (napaka, uporabnik) => {
        if (napaka) {
            res.status(404)
        } else {
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
                    
                    res.status(200)
                })
                .catch(err => {
                    res.send(err)
             });
        }
    })

    
}

var spremeniTekmo = (req, res) => {
    const {datum, ura, opis} = req.body;
    Tekma.findOne({_id: req.params.id}, function (err, tekma) {
        if(err){
            console.log(err);
        }else{
            if(tekma.status == 'prijave'){
                tekma.datum = datum;
                tekma.ura = ura;
                tekma.opis = opis;
                tekma.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    });
}

var prijaviSeNaTekmo = (req, res, done) => {
    
    let idTekme = req.params.id;
    let idUser = req.body.id
    User.findById(idUser, (err, uporabnik) => {
        var user = {
            id: idUser,
            ime: uporabnik.ime,
            priimek: uporabnik.priimek
        }
        Tekma.findById(idTekme, (err, tekma) => {
            console.log(tekma)
            if(tekma.status === "prijave"){
                console.log("Je prijave")
                var jePrijavljen = false;
                tekma.igralci.forEach(element => {
                    console.log(element)
                    if(element.id + "" == user.id + ""){
                        jePrijavljen = true;
                    }
                })
                if(!jePrijavljen){
                    
                    tekma.igralci.push(user)
                    tekma.prijavljeni++;
                    tekma.save()
                    console.log(tekma)
                }
            }
        })
    });
    res.send({sporocilo: "Prijavi"})
}

var odjaviSeOdTekme = (req, res, done) => {
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
                    
                    tekma.prijavljeni--;
                    tekma.save()
                    console.log(tekma)
                }
            }
        })
    });
    res.send({sporocilo: "Odjavi"})
}

var izbrisiTekmo = (req, res) => {
    Tekma.deleteOne({_id: req.params.id}, function (err){
        if(err){
            console.log(err);
        }
    });
}

module.exports = {
    podrobnostiTekme,
    ustvariTekmo,
    spremeniTekmo,
    prijaviSeNaTekmo,
    odjaviSeOdTekme,
    izbrisiTekmo
}