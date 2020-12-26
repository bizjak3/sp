const User = require('../models/User');

var najdiUporabnika = (req, res) => {
    
    User.findOne({email: req.body.email}, 
        (napaka, uporabnik) => {
            if (napaka) {
                console.log(napaka)
            }
            else {
                res.send(uporabnik)
            }
        }
    ) 
}

var spremeniUporabnika = (req, res) => {
    
    const {id, ime, priimek, email, telefon, geslo} = req.body;
    console.log("ID: " + id)
    User.findOne({_id: id},
    (napaka, uporabnik) => {
        if (napaka) {
            console.log(napaka)
        }else {
            console.log(ime)
            uporabnik.ime = ime;
            uporabnik.priimek = priimek;
            uporabnik.email = email;
            uporabnik.telefon = telefon;
            uporabnik.nastaviGeslo(geslo)
            
            uporabnik.save()
        }
    })
}

module.exports = {
    najdiUporabnika,
    spremeniUporabnika
}