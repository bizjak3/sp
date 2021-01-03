const Tekma = require('../models/Tekma');
const User = require('../models/User')

var homepage = (req, res) => {
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

var search = (req, res) => {
    console.log(req.params.niz)
    var iskalni_niz2 = req.params.niz;
    iskalni_niz2 = iskalni_niz2.toLowerCase();
    

    //console.log(iskalni_niz3);


    Tekma.find({}).exec((err, tekma) => {
        let tabelaTekem = [];
        let tabelaUporabnikov = [];

        for(var i=0; i < tekma.length; i++) {
            let trenutniKraj =(tekma[i].kraj).toLowerCase();
            if ((trenutniKraj.includes(iskalni_niz2)) == true) {
                //console.log("se je izvedel if");
                tabelaTekem.push(tekma[i]);
            }
        }

        User.find().exec((err,user) => {
            console.log(user)
            if (user) {
                for(var i=0; i < user.length; i++) {
                    let trenutniIme = (user[i].ime).toLowerCase();
                    let trenutniPriimek = (user[i].priimek).toLowerCase();
                    
                    if (trenutniIme.includes(iskalni_niz2) || trenutniPriimek.includes(iskalni_niz2)) {
                        console.log(user[i])
                        tabelaUporabnikov.push(user[i]);
                    }
                }
                res.status(200).send({tabelaTekem: tabelaTekem, tabelaUporabnikov: tabelaUporabnikov});
            }
        });

        

    });
}

module.exports = {
    homepage, 
    tekme,
    markers, 
    search
}