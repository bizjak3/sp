const User = require('../models/User');
const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey('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');
sgMail.setApiKey(process.env.MAIL_API);

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

var spremeniUporabnika = (req, res) => {
    
    const {id, ime, priimek, email, telefon, geslo} = req.body;

    if (!ime || !priimek || !email || !geslo) {
        return res.status(400).json({sporocilo: "Prosim preglej vnešene podatke",  status: "danger"})
    }

    if (geslo.length < 6) {
        return res.status(400).json({sporocilo: "Geslo mora vsebovati vsaj 6 znakov", status: "danger"})
    }
    User.findOne({_id: id},
    (napaka, uporabnik) => {
        if (napaka) {
            return res.status(500).json({sporocilo: napaka, status: "danger"})
        }else {
            console.log(ime)
            uporabnik.ime = ime;
            uporabnik.priimek = priimek;
            uporabnik.email = email;
            uporabnik.telefon = telefon;
            uporabnik.nastaviGeslo(geslo)
            
            uporabnik.save()
            return res.status(400).json({sporocilo: "Uspešno spremenjeni podatki", status: "success"})
        }
    })
}

var vrniUporabnikaPrekoId =  (req, res) => {
    
    var id = req.params.id;
    console.log(id)
    User.findById(id, (napaka, uporabnik) => {
        if (napaka) {
            return res.status(500).json({sporocilo: napaka})
        }
        else {
            res.status(200).send(uporabnik)
        }
    })
    
}

var pozabilGeslo =  (req, res) => {
    const mail  = req.body.mail;

    let novoGeslo = Math.random().toString(36).substring(1);

    console.log("Mail: " + mail)


    //posljiEmail(email,'Sprememba gesla', "Novo geslo je: " + novoGeslo);
    User.findOne({email: mail}, (napaka, uporabnik) => {
        if (napaka) {
            res.status(500).json(napaka)
        } 
        if (uporabnik) {
            uporabnik.nastaviGeslo(novoGeslo)
            uporabnik.save()
            posljiEmail(mail,'Sprememba gesla', "Novo geslo je: " + novoGeslo);
            res.status(200).json({sporocilo: "Mail uspešno poslana", status: "success"})
        }
        else {  
            res.status(401).json({sporocilo: "Uporabnik s tem elektronskim naslovom ne obstaja", status: "danger"})
        }
    })
}

module.exports = {
    spremeniUporabnika,
    vrniUporabnikaPrekoId, 
    pozabilGeslo
}