const mongoose = require('mongoose');

var dbURI = process.env.NODE_ENV || 'mongodb://localhost:27017';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose je povezan na ${dbURI}.`);
});

mongoose.connection.on('error', (napaka) => {
  console.log('Mongoose napaka pri povezavi: ', napaka);
});