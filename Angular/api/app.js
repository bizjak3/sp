const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')
var passport = require('passport');

require('dotenv').config();

require('./models/db');
require('./konfiguracija/passport');

const homepage = require('./routes/homepage')
const profil = require('./routes/profil');
const db = require('./routes/db');
const tekma = require('./routes/tekma');
const avtentikacija = require('./routes/avtentikacija');
const uporabnik = require('./routes/uporabnik');



app.use(cors())  
app.use(bodyParser.json())

app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/', homepage);
app.use('/', profil);
app.use('/', db);
app.use('/', tekma);
app.use('/', avtentikacija);
app.use('/', uporabnik);

app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({"sporočilo": err.name + ": " + err.message});
  }
});


app.listen(3000, () => {
    console.log("Server started on port 3000")
})