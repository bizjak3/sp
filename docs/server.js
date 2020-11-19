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
                return "<span class=\"badge badge-danger\">SUPER OCENA!</span>";

            return "<span class=\"badge badge-danger\">POVPREČNA OCENA</span>";
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


app.listen(8080, () => {
    console.log('Server is starting at port ', 8080);
})