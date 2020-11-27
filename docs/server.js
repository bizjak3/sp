const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path')

/* email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'bizjak3@gmail.com',
    from: 'testektesto@gmail.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
    .send(msg)
    .then(() => {}, error => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    });
//ES8
(async () => {
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
})();
*/

const app = express();

require('./config/passport')(passport);

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