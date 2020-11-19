const express = require('express');
const app = express();
const expbs = require('express-handlebars');

app.engine('handlebars', expbs({
    partialsDir: 'views/partials'
}));
app.set('view engine', 'handlebars');

app.use(express.static('views/images'));
app.use(express.static('css'));

// Rounting?
app.get('/profil', (req, res) => {
    res.render('profil',{layout: false, profil: true});
})

app.get('/zgodovina', (req, res) => {
    res.render('zgodovina',{layout: false, zgodovina: true});
})

app.get('/nastavitve', (req, res) => {
    res.render('nastavitve',{layout: false, nastavitve: true});
})


app.listen(8080, () => {
    console.log('Server is starting at port ', 8080);
})