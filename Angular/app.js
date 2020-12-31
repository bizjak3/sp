const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')
var passport = require('passport');

require('dotenv').config();

require('./api/models/db');
require('./api/konfiguracija/passport');

const db = require('./api/routes/db');
var index = require('./api/routes/index')

app.use(cors())  
app.use(bodyParser.json())

app.use(passport.initialize());

app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/', db);
app.use('/', index)

app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({"sporočilo": err.name + ": " + err.message});
  }
});

app.listen(3000, () => {
    console.log("Server started on port 3000")
})