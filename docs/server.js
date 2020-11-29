const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path')
require('dotenv').config()
require('./config/passport')(passport);
const app = express();


// vreme
const Tekma = require('./models/Tekma');

var http = require('http');

var options = {
    host : 'weather.marela.team',
    path: '/api/v2/arso/opozorila/trenutna?lat=45.88674219700143&lon=13.905384725727284',
    headers: {
        'Content-Type': 'application/json',
        'app-id': 'm3EYx2vqsGNziQ5PlJmpb1Cjvob0JPs5y6GZK3LP27r8zhtEmMNUaUjx3YpqTVb4ezpoIJMEkq6PDjYLQAT9shlgWvu8dQvlfYOBBYqhtAXL9BxsNst5FuDqYb5LFIYt'
    }
}

var a;

var vreme = function(response){
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      })
      response.on('end', () => {
        a = JSON.parse(data);
      })
}

async function weatherCheck(){
    Tekma.find({}).exec((err, tekma) => {

    });
    http.request(options, vreme).end();

}


//slike
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const lokalna_baza = "mongodb://localhost:27017";
const docker_baza = "mongodb://mongo:27017/mongo_baza";

//Lokalna baza
mongoose.connect(lokalna_baza, { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));

//Globalna baza
//const db = require('./config/keys').mongoURI;
/*
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));
*/

app.engine('handlebars', exphbs( { helpers: require('./views/helpers/hlps'),   runtimeOptions: {
        allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true
}} ));
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


//http.request(options, vreme).end();

//console.log(a);

//setInterval(weatherCheck, 3000);

weatherCheck();

app.listen(8080, console.log('Server started on port 8080'));

