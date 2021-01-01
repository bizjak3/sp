const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')
var passport = require('passport');
var swaggerJsdoc = require('swagger-jsdoc')
var swaggerUi = require('swagger-ui-express')

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "EduGeoCache",
      version: "1.0.0",
      description: "EduGeoCache REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    servers: [
      { url: "http://localhost:3000/api" } 
    ]
  },
  apis: [
    "./api/models/Tekma.js",
    "./api/models/User.js",
    "./api/routes/index.js"
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

require('dotenv').config();

require('./api/models/db');
require('./api/konfiguracija/passport');

const db = require('./api/routes/db');
var indexApi = require('./api/routes/index')

app.use(cors())  
app.use(bodyParser.json())

app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api', db);
app.use('/api', indexApi)

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({"sporočilo": err.name + ": " + err.message});
  }
});

app.listen(3000, () => {
    console.log("Server started on port 3000")
})