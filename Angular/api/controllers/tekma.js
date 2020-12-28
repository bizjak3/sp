const Tekma = require('../models/Tekma')

var podrobnostiTekme = (req, res) => {
    console.log("parametri: " + req.params.id)
    Tekma.find({
        _id: req.params.id
    }).then((tekma) => {
        res.send(tekma)
    })
}

var ustvariTekmo = (req, res) => {
    console.log("ID: " + req.params.id)
    console.log(req.body)
    
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

    const newTekma = new Tekma({
        kreator: req.params.id,
        lat: lat,
        lng: lng,
        kraj: kraj,
        datum: datum,
        ura: ura,
        minIgralcev: min,
        maxIgralcev: max,
        prijavljeni: prijavljeni,
        opis: opombe,
        igralci: [req.params.id],
        status: "prijave"
    });

    newTekma.save()
        .then(tekma => {
            User.updateOne(
                {_id: req.user},
                { $push: {tekme: tekma.id}},
                done
            );
            res.status(200)
        })
        .catch(err => {
            res.send(err)
     });
}

module.exports = {
    podrobnostiTekme,
    ustvariTekmo
}