const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path')

const app = express();

require('./config/passport')(passport);

//Database config
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));



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

app.use('/', require('./routes/users'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/profil'));
app.use('/', require('./routes/pop_up_tekma'));
app.use('/', require('./routes/ustvari_tekmo'));



app.listen(8080, console.log('Server started on port 8080'));