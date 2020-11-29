const mongoose = require('mongoose');
const Tekma = require('../models/Tekma');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

//slike
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const mongoURI = "mongodb://localhost:27017/test"

//Docker baza
const mongoURIDocker = "mongodb://mongo:27017/mongo-baza"

const conn = mongoose.createConnection( process.env.MONGODB_URI ||  mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});

//init gfs
let gfs;
conn.once('open', () => {
    //stream na bazo za slike
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
})


//storage engine
const storage = new GridFsStorage({

    //docker
    //url: mongodb://mongo:27017/mongo-baza

    url: process.env.MONGODB_URI ||  mongoURI,
    file: (req, file) => {
        let id = req.user._id.toString();
        id = id + '.jpg';

        gfs.files.findOne({ filename: id.toString() }, (err, file) => {
            // Check if files
            if (!file || file.length === 0) {
            }
            else{
                gfs.remove({filename: id.toString(), root: 'uploads'}, (err, gridStore) => {
                    if (err) {
                    }
                });

            }
        });

        return new Promise((resolve, reject) => {

            //spremeni na id+extension
            const filename =  req.user._id.toString() + '.jpg';
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);

        });
    }
});

const izbrisi = (req,res) => {

    let id = req.user._id.toString();
    id = id + '.jpg';
    gfs.remove({filename: id.toString(), root: 'uploads'}, (err, gridStore) => {
        if (err) {
            console.log(err);
        }
    });

    res.redirect('/nastavitve_uredi');

}

const upload = multer({ storage });
//konec slik

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


    let id = req.user._id.toString();
    id = id+'.jpg';

    let tekme = req.user.tekme;
    let tabelaTest = [];

    for(var i = 0; i < tekme.length; i++){
        Tekma.findOne({_id: tekme[i]}, function (err, novo) {
            tabelaTest[i] = novo;
        });
    }

    gfs.files.findOne({ filename: id.toString() }, (err, file) => {
        // Check if files
        if (!file || file.length === 0) {
            res.render('moje_tekme',{
                image: false,
                moje_tekme: true,
                user: req.user,
                tekme: tabelaTest,
                user: req.user
            });
        } else {
            res.render('moje_tekme',{
                image: true,
                slika: file.filename,
                moje_tekme: true,
                user: req.user,
                tekme: tabelaTest,
                user: req.user
            });
        }
    });
};

const najdiSliko = (req,res) =>{
    //id uporabnika
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
}

var profil = (req, res) => {

    let id = req.user._id.toString();
    id = id+'.jpg';
    gfs.files.findOne({ filename: id.toString() }, (err, file) => {
        // Check if files
        if (!file || file.length === 0) {
            res.render('profil',{
                image: false,
                profil: true,
                user: req.user
            });
        } else {
            res.render('profil',{
                image: true,
                slika: file.filename,
                profil: true,
                user: req.user
            });
        }
    });

};

var profil_ostali = (req, res) => {

    if(!req.user){
        return res.redirect('/login');
    }
    let userId = req.params.id;
    User.find({_id: userId}, function (err,igralec){
        if(err){
            console.log(err);
            res.redirect("/");
        }

        igralec = igralec[0];

        gfs.files.findOne({ filename: igralec.toString() }, (err, file) => {
            // Check if files
            if (!file || file.length === 0) {
                res.render('profil_ostali',{
                    image: false,
                    profil: true,
                    user: req.user,
                    name: igralec.name,
                    surname: igralec.surname,
                    email: igralec.email,
                    telefon: igralec.telefon,
                    ocena: igralec.ocena,
                    telDrugi: igralec.telDrugi,
                    emailDrugi: igralec.emailDrugi
                });
            } else {
                res.render('profil_ostali',{
                    image: true,
                    slika: file.filename,
                    profil: true,
                    user: req.user,
                    name: igralec.name,
                    surname: igralec.surname,
                    email: igralec.email,
                    telefon: igralec.telefon,
                    ocena: igralec.ocena,
                    telDrugi: igralec.telDrugi,
                    emailDrugi: igralec.emailDrugi
                });
            }
        });
    });


};

var nastavitve = (req, res) => {

    let id = req.user._id.toString();
    id = id+'.jpg';
    gfs.files.findOne({ filename: id.toString() }, (err, file) => {
        // Check if files
        if (!file || file.length === 0) {
            res.render('nastavitve',{
                image: false,
                nastavitve: true,
                user: req.user
            });
        } else {
            res.render('nastavitve',{
                image: true,
                slika: file.filename,
                nastavitve: true,
                user: req.user
            });
        }
    });
};

var nastavitve_uredi = (req, res) => {

    let id = req.user._id.toString();
    id = id+'.jpg';
    gfs.files.findOne({ filename: id.toString() }, (err, file) => {
        // Check if files
        if (!file || file.length === 0) {
            res.render('nastavitve_uredi',{
                image: false,
                nastavitve_uredi: true,
                user: req.user
            });
        } else {
            res.render('nastavitve_uredi',{
                image: true,
                slika: file.filename,
                nastavitve_uredi: true,
                user: req.user
            });
        }
    });

};

const podrobnostiTekme = (req, res) => {
    if(!req.user){
         return res.redirect('/login');
    }
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
            let ustvarnik = tekma.kreator;
            User.findOne({_id: ustvarnik}).lean().exec((err, kreator) => {
                if(err){
                    console.log(err);
                    res.status(400);
                }
                let sodelujoci = [];
                let pridruzen = false;
                igralci.forEach(element => {
                    sodelujoci.push({   id: element._id,
                                        name: element.name,
                                        surname: element.surname,
                                        rating: element.ocena
                                        });

                    if(element._id + "" === req.user._id + ""){
                        pridruzen = true;
                    }
                });
                povratniKlic(req, res, {
                                        layout: 'main',
                                        user: req.user,
                                        lahkoOcenjamo: true,
                                        ocenjamo: false,
                                        urejamo: false,
                                        pridruzen: pridruzen,
                                        tekma: tekma,
                                        kreator: kreator,
                                        sodelujoci: sodelujoci
                                        });
            });
        });
    })
};

const prikaziPodrobnostiTekme = (req, res, vsebina) => {

    let lahkoOcenjamo = false;
    let ocenjamo = false;
    let urejamo = false;
    let lahkoUrejamo = false;

    if(vsebina.tekma.status == 'prijave'){
        lahkoUrejamo = true;
    }else{
        if(vsebina.tekma.igralci.includes(req.user._id + "")){
            if(vsebina.tekma.zeOcenili.includes(req.user._id + "")){
                lahkoOcenjamo = false;
            }else{
                lahkoOcenjamo = true;
            }
        }
    }

    res.render('pop_up_tekma', {layout: vsebina.layout,
                                user: vsebina.user,
                                lahkoOcenjamo: lahkoOcenjamo,
                                ocenjamo: ocenjamo,
                                urejamo: urejamo,
                                lahkoUrejamo: lahkoUrejamo,
                                pridruzen: vsebina.pridruzen,
                                tekma: vsebina.tekma,
                                kreator: vsebina.kreator,
                                sodelujoci: vsebina.sodelujoci});
};

const oceniIgralce = (req, res) => {
    if(!req.user){
         return res.redirect('/login');
    }
    pridobiPodrobnostiTekme(req, res, (req, res, vsebina) => {
        prikaziOcenjanjeTekme(req, res, vsebina);
    });
};

const prikaziOcenjanjeTekme = (req, res, vsebina) => {
    let lahkoOcenjamo = false;
    let ocenjamo = false;
    let urejamo = false;
    let lahkoUrejamo = false;
    if(vsebina.tekma.status == 'prijave'){
        return res.redirect('/pop_up_tekma/' + vsebina.tekma._id);
    }else{
        lahkoOcenjamo = true;
        ocenjamo = true;
    }

    res.render('pop_up_tekma', {layout: vsebina.layout,
                                user: vsebina.user,
                                lahkoOcenjamo: lahkoOcenjamo,
                                ocenjamo: ocenjamo,
                                urejamo: urejamo,
                                pridruzen: vsebina.pridruzen,
                                tekma: vsebina.tekma,
                                kreator: vsebina.kreator,
                                sodelujoci: vsebina.sodelujoci});
};

const oceniIgralce_POST = (req, res, done) => {
    if(!req.user){
        return res.redirect('/login');
    }
    let idTekme = req.params.id;
    let ocene = req.body;
    Tekma.findOne({_id: idTekme}, function (err, tekma) {
        Tekma.updateOne(
            { _id: idTekme },
            { $push: { zeOcenili: req.user._id } },
            done
        );
        let playerIDs = tekma.igralci;
        User.find({_id: playerIDs}, function (err, igralci){
            if(err){
                console.log(err);
                res.redirect('/');
            }
            let i = 0;
            igralci.map(user => {
                let trenutnaOcena = user.ocena;
                let trenutnoSteviloOcen = user.steviloOcen;

                let koncnaOcena = trenutnaOcena + (ocene.ocena[i] - trenutnaOcena) / trenutnoSteviloOcen;
                let koncnoStevilo = trenutnoSteviloOcen + 1;
                user.ocena = koncnaOcena;
                user.steviloOcen = koncnoStevilo;
                user.save();
                i++;
            });
        });
    });
    res.redirect('/pop_up_tekma/' + idTekme);
};

const urediTekmo = (req, res, povratniKlic) => {
    if(!req.user){
         return res.redirect('/login');
    }
    pridobiPodrobnostiTekme(req, res, (req, res, vsebina) => {
        prikaziUrejanjeTekme(req, res, vsebina);
    });
};

const prikaziUrejanjeTekme = (req, res, vsebina) => {
    let lahkoOcenjamo = false;
    let ocenjamo = false;
    let urejamo = false;
    let lahkoUrejamo = false;

    if(vsebina.tekma.status == 'prijave'){
        lahkoUrejamo = true;
        urejamo = true;
    }

    res.render('pop_up_tekma', {layout: vsebina.layout,
                                user: vsebina.user,
                                lahkoOcenjamo: lahkoOcenjamo,
                                ocenjamo: ocenjamo,
                                urejamo: urejamo,
                                pridruzen: vsebina.pridruzen,
                                tekma: vsebina.tekma,
                                kreator: vsebina.kreator,
                                sodelujoci: vsebina.sodelujoci});
};

const urediTekmo_POST = (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const {datum, ura, komentarji} = req.body;
    let idTekme = req.params.id;
    Tekma.findOne({_id: idTekme}, function (err, tekma) {
        if(tekma.status != 'prijave'){
            tekma.datum = datum;
            tekma.ura = ura;
            tekma.opis = komentarji;
            tekma.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });

    res.redirect('/pop_up_tekma/' + idTekme);
};

const izbrisiTekmo = (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    let idTekme = req.params.id;
    Tekma.deleteOne({_id: idTekme}, function (err){
        if(err){
            console.log(err);
        }
    });
    res.redirect('/');
};

const pridruziSeTekmi = (req, res, done) => {
    if(!req.user){
        return res.redirect('/login');
    }

    let idTekme = req.params.id;

    Tekma.findOne({_id: idTekme}).lean().exec((err, t) => {
        if(t.status == 'prijave'){
            if(!t.igralci.includes(req.user._id + "")){
                Tekma.updateOne(
                     { _id: idTekme },
                     { $push: { igralci: req.user._id } },
                     done
                );
                Tekma.updateOne(
                     { _id: idTekme },
                     { $inc: { prijavljeni: 1}},
                     done
                );
            }
        }
    });

    let userid = req.user;
    User.updateOne(
        {_id: userid},
        { $push: {tekme: idTekme}},
        done
    );
    res.redirect('/pop_up_tekma/' + idTekme);
};

const odjaviOdTekme = (req, res, done) => {
    if(!req.user){
        return res.redirect('/login');
    }

    let idTekme = req.params.id;

    Tekma.findOne({_id: idTekme}).lean().exec((err, t) => {
        if(t.status == 'prijave'){
            if(t.igralci.includes(req.user._id + "")){
                Tekma.updateOne(
                     { _id: idTekme },
                     { $pull: { igralci: req.user._id } },
                     done
                );
                Tekma.updateOne(
                     { _id: idTekme },
                     { $inc: { prijavljeni: -1}},
                     done
                );
            }
        }
    });

    User.updateOne(
        {_id: userid},
        { $pull: {tekme: idTekme}},
        done
    );
    res.redirect('/pop_up_tekma/' + idTekme);
};

var ustvari_tekmo = (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    res.render('ustvari_tekmo', {
        ustvari_tekmo: true
    });
};

var ustvari_tekmo_POST = (req, res, done) => {
    if(!req.user){
        return res.redirect('/login');
    }
    let {lat, lng, kraj, datum, ura, minIgralcev, maxIgralcev, prijavljeni, komentarji } = req.body;
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
        kreator: req.user._id,
        lat,
        lng,
        kraj,
        datum,
        ura,
        minIgralcev,
        maxIgralcev,
        prijavljeni,
        opis: komentarji,
        igralci: [req.user._id],
        status: "prijave"
    });

    newTekma.save()
        .then(tekma => {
            User.updateOne(
                {_id: req.user},
                { $push: {tekme: tekma.id}},
                done
            );
            res.redirect('/');
        })
        .catch(err => console.log(err))
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
    }

    posljiEmail(email,'Sprememba nastavitev','Nastavitve uspešno spremenjene');
    setTimeout(function() {res.redirect('/nastavitve')},500);
}

const nastavitve_POST = (req, res) => {
    const {emailOdpoved, emailprihajujoče} = req.body;
    let errors = [];


    let id = req.user._id;

    User.findOne({_id: id}, function (err, user) {
        if(!emailOdpoved)
            user.emailOdpade = false;
        else
            user.emailOdpade = true;

        if(!emailprihajujoče)
            user.emailPrihaja = false;
        else
            user.emailPrihaja = true;

        user.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

    });
    res.redirect('/nastavitve');
}

const nastavitve_osebni_POST = (req,res) =>{

    const {telPokazi, emailPokazi} = req.body;
    let errors = [];

    User.findOne({_id: req.user._id}, function (err, user) {

        if(!telPokazi)
            user.telDrugi = false;
        else
            user.telDrugi = true;

        if(!emailPokazi)
            user.emailDrugi = false;
        else
            user.emailDrugi = true;

        user.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

    });
    res.redirect('/nastavitve');

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

const nalozi = upload.single('file');

const nalozi_sliko = (req, res) => {

    res.redirect('/profil');

};

const register = (req, res) => {
    const { name, surname, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (password !== password2) {
        errors.push(1);
        req.flash('error', 'Gesli se ne ujemata');
    }

    if (password.length < 6) {
        errors.push(1);
        req.flash('error', 'Geslo mora vsebovati vsaj 6 znakov')
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            surname,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    //User exists
                    errors.push(1);
                    req.flash('error', 'Uporabnik že obstaja');
                    res.render('register', {
                        errors,
                        name,
                        surname,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        surname,
                        email,
                        password
                    })
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash('success', 'Uspešno ste se registrirali')
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err))
                        }))
                }
            });
    }
};


var search = (req, res) => {
    var bbb = req.url;
    var iskalni_niz1  = bbb.split("?")[1];
    var iskalni_niz2 = iskalni_niz1.split("=");
    var iskalni_niz3;
    if (iskalni_niz2[0] == "search_niz") {
        iskalni_niz3 = (iskalni_niz2[1]).toLowerCase();
    } else {
        res.redirect("/");
    }

    //console.log(iskalni_niz3);


    Tekma.find({}).exec((err, tekma) => {
        let tabelaTekem = [];
        let tabelaUporabnikov = [];

        User.find({}).exec((err,user) => {

            for(var i=0; i < user.length; i++) {
                let trenutniIme = (user[i].name).toLowerCase();
                let trenutniPriimek = (user[i].surname).toLowerCase();

                if (trenutniIme.includes(iskalni_niz3) || trenutniPriimek.includes(iskalni_niz3)) {
                    tabelaUporabnikov.push(user[i]);
                }
            }

        });


        for(var i=0; i < tekma.length; i++) {
            let trenutniKraj =(tekma[i].kraj).toLowerCase();
            if ((trenutniKraj.includes(iskalni_niz3)) == true) {
                //console.log("se je izvedel if");
                tabelaTekem.push(tekma[i]);
            }
        }

       // console.log("tabela tekem spodej");
        // console.log(tabelaTekem);

        res.render('search', {tabelaTekem: tabelaTekem, tabelaUporabnikov : tabelaUporabnikov});

    });

};

const izbrisiUporabnika = (req, res) => {
    id = req.user._id;
    User.deleteMany({_id: id}, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/logout")
        }
    })

}


module.exports = {
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
    nalozi_sliko,
    nastavitve_POST,
    podrobnostiTekme,
    pozabil_geslo,
    najdiSliko,
    urediTekmo,
    urediTekmo_POST,
    izbrisiTekmo,
    pridruziSeTekmi,
    odjaviOdTekme,
    izbrisi,
    nalozi,
    oceniIgralce,
    oceniIgralce_POST,
    register,
    ustvari_tekmo_POST,
    search,
    izbrisiUporabnika
};