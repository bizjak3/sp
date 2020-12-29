const Tekma = require('../models/Tekma')
const User = require('../models/User')

var podrobnostiTekme = (req, res) => {
    console.log("parametri: " + req.params.id)
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

module.exports = {
    podrobnostiTekme,
    ustvariTekmo
}