const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

//Database config
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));

app.engine('handlebars', hbs());
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

app.use('/', require('./routes/users'))
app.use('/homepage', require('./routes/index'))


app.listen(8080, console.log('Server started on port 8080'));