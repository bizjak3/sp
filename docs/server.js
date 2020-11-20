const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

//nastavi css,js in images na public or smth
app.use(express.static('views/images'));
app.use(express.static('css'));
app.use(express.static('js'));




//helper za zvezdice
const hbs = exphbs.create({

    //direktorij partials
    partialsDir: 'views/partials',

    //pobarvaj "ocena" zvezdic
    helpers: {
        zvezdice: function(ocena, opcija){
            let vrni = '';
            for(let i = 0; i <= 5; ++i) {
                let pobarvane = ocena >= i ? ' checked' : '';
                vrni += `<span class='fa fa-star${pobarvane}'></span>`;
            }
            return new Handlebars.SafeString(vrni);
        },
        zvezdica: function (ocena){
            let rezultat = "";
            for(var i = 0; i < 5; i++){
                if(ocena > 0) {
                    rezultat += "<span class=\"fa fa-star checked\"></span>";
                    ocena --;

                }
                else
                    rezultat += "<span class=\"fa fa-star\"></span>";
            }
            return rezultat;
        },
        ocenaIgralca: function (ocena){
            if(ocena < 1)
                return "<span class=\"badge badge-danger\">SLABA OCENA!</span>";
            if(ocena == 5)
                return "<span class=\"badge btn btn-success\">SUPER OCENA!</span>";

            return "<span class=\"badge btn btn-primary\">POVPREČNA OCENA</span>";
        }
    }
})



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Rounting?
app.get('/profil', (req, res) => {
    res.render('profil',{
        layout: false,
        profil: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3
    });
})

app.get('/zgodovina', (req, res) => {
    res.render('zgodovina',{
        layout: false,
        zgodovina: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3
    });
})

app.get('/nastavitve', (req, res) => {
    res.render('nastavitve',{
        layout: false,
        nastavitve: true,
        ime: 'Janez',
        priimek: 'Novak',
        email: "janezek@gmail.com",
        ocena: 3,
        telefon: '010569412',
        geslo: 'Security? NO'
    });
})

app.get('/pop_up_tekma', (req, res) => {
    res.render('pop_up_tekma', {
        layout: false,
        ustvari_tekmo: true,
        tekma : {
                    kreator : "Janez Novak",
                    lokacija : "Ljubljana, Rožna cesta 13",
                    datum : "6. 9. 2020",
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
})

app.get('/ustvari_tekmo', (req, res) => {
    res.render('ustvari_tekmo', {
        layout: false,
        ustvari_tekmo: true

    });
})

app.listen(8080, () => {
    console.log('Server is starting at port ', 8080);
})