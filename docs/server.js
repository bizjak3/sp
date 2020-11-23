const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

//nastavi css,js in images na public or smth
app.use(express.static('views/images'));
app.use(express.static('css'));
app.use(express.static('js'));


var pop_up_router = require('./routes/pop_up_tekma');
var nastavitve_router = require('./routes/nastavitve');
var profil_router = require('./routes/profil');
var zgodovina_router = require('./routes/zgodovina');
var ustvari_tekmo_router = require('./routes/ustvari_tekmo');
var homepage_router = require('./routes/homepage');

//helper za zvezdice
const hbs = exphbs.create({

    defaultLayout: 'main',

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
            if(ocena < 2)
                return "<span class=\"badge badge-danger\">SLABA OCENA!</span>";
            if(ocena == 5)
                return "<span class=\"badge btn btn-success\">SUPER OCENA!</span>";

            return "<span class=\"badge btn btn-primary\">POVPREČNA OCENA</span>";
        }
    }
})



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use('/', pop_up_router);
app.use('/', nastavitve_router);
app.use('/', profil_router);
app.use('/', zgodovina_router);
app.use('/', ustvari_tekmo_router);
app.use('/', homepage_router);

app.listen(8080, () => {
    console.log('Server is starting at port ', 8080);
})