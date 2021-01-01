const Tekma = require('../models/Tekma');

var homepage = (req, res) => {
    console.log(req.params.d)
    let d = req.params.d
    let p = req.params.p-1
    let skip = p * 10;
    Tekma.find().sort({datum: d}).skip(skip).limit(10).lean().exec({}, function (err, tekma) {
        if (err) {
            return res.status(500).json({sporocilo: err})
        } else {
            res.status(200).send(tekma)
        }
    });
};

var tekme = (req, res) => {
    Tekma.find({}).lean().exec({}, function (err, tekme) {
        if (err) {
            return res.status(500).json({sporocilo: err})
        } else {
            res.status(200).send({stevilo: tekme.length})
        }
    });
}

var markers = (req, res) => {
    Tekma.find({}).lean().exec({}, function (err, tekme) {
        if (err) {
            return res.status(500).json({sporocilo: err})
        } else {
            
            res.status(200).send(tekme)
        } 
    });
}

module.exports = {
    homepage, 
    tekme,
    markers
}