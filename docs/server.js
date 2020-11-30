const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const app = express();


// vreme
const Tekma = require('./models/Tekma');

var http = require('http');

var cas = 'weather.marela.team/api/v2/arso/opozorila?lat=XXXlon=XXX&time=XXX';
var trenutna = '/api/v2/arso/opozorila/trenutna?';

var options = {
    host : 'weather.marela.team',
    path: '/api/v2/arso/opozorila/trenutna?',
    headers: {
        'Content-Type': 'application/json',
        'app-id': 'm3EYx2vqsGNziQ5PlJmpb1Cjvob0JPs5y6GZK3LP27r8zhtEmMNUaUjx3YpqTVb4ezpoIJMEkq6PDjYLQAT9shlgWvu8dQvlfYOBBYqhtAXL9BxsNst5FuDqYb5LFIYt'
    }
};

function weatherCheck(){
    Tekma.find({status: "prijave"}).exec((err, tekme) => {
        tekme.forEach(tekma => {
            let id = tekma._id;
            options.path = trenutna + "lat=" + tekma.lat + "&lon=" + tekma.lng;
            let cajt = new Date();
            let d = new Date(tekma.datum);
            let t = new Date();
            d.setHours(0, 0, 0, 0);
            t.setHours(0, 0, 0, 0);
            if(d + "" == t + ""){
                if((tekma.ura+ "") == (cajt.getHours() + 2 + ":" + cajt.getMinutes())){
                    http.request(options, (podatki) => {
                          let data = '';
                          podatki.on('data', chunk => {
                            data += chunk;
                          })
                          podatki.on('end', () => {
                            let p = JSON.parse(data);
                            p.opozorila.forEach(element => {
                                if(element.stopnja != 'zelena'){
                                    tekma.status = 'odpadla';
                                    tekma.save();
                                }
                            });
                          })
                    }).end();
                }
            }
        });
    });
};

function statusCheck(){
    Tekma.find({status: "prijave"}).exec((err, tekme) => {
        tekme.forEach(tekma => {
            let id = tekma._id;
            options.path += "lat=" + tekma.lat + "&lon=" + tekma.lng;
            let cajt = new Date();
            let d = new Date(tekma.datum);
            let t = new Date();
            d.setHours(0, 0, 0, 0);
            t.setHours(0, 0, 0, 0);
            if(d + "" == t + ""){
                if(tekma.ura.split(':')[0] + "" < cajt.getHours() + ""){
                    tekma.status = 'zakljucena';
                    tekma.save();
                }
            }
        });
    });
};

//slike
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const lokalna_baza = "mongodb://localhost:27017";
const docker_baza = "mongodb://mongo:27017/mongo_baza";

//Lokalna baza
mongoose.connect(process.env.MONGODB_URI || lokalna_baza, { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));

//Globalna baza
//const db = require('./config/keys').mongoURI;
/*
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));
*/

app.engine('handlebars',
    exphbs( {
        helpers: require('./views/helpers/hlps'),
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
    }}
));
app.set('view engine', 'handlebars');
app.use(express.static('public'));



app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', require('./routes/homepage'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/profil'));
app.use('/', require('./routes/pop_up_tekma'));
app.use('/', require('./routes/ustvari_tekmo'));
app.use('/', require('./routes/db'));

app.use('/', require('./routes/search'));


//weatherCheck();

//statusCheck();

setInterval(statusCheck, 300000);
setInterval(weatherCheck, 900000);

var PORT = process.env.PORT || 8080;

app.listen(PORT, console.log('Server started on port ' + PORT));

