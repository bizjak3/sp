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







//Lokalna baza
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));

//Globalna baza
//const db = require('./config/keys').mongoURI;
/*
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));
*/



app.engine('handlebars', exphbs( { helpers: require('./views/helpers/hlps')} ));
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



app.listen(8080, console.log('Server started on port 8080'));