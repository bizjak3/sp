const mongoose = require('mongoose');


var dateFormat = {
    short: "DD MMMM - YYYY",
};
var hourFormat = {
    short: "HH - MM",
};

const tekma = new mongoose.Schema({
    kreator: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    kraj: {
        type: String,
        required: true
    },
    datum: {
        type: dateFormat,
        required: true
    },
    ura: {
        type: hourFormat,
        required: false
    },
    minIgralcev: {
        type: Number,
        required: true
    },
    maxIgralcev: {
        type: Number,
        required: true
    },
    prijavljeni: {
        type: Number,
        required: true
    },
    opis: {
        type: String,
        required: false
    },
    igralci: {
        type: [String],
        required: false
    },
    status: {
        type: String,   //odpadla, zakljucena, prijave
        required: true
    },
    zeOcenili: {
        type: [String],
        required: false
    }
});

const Tekma = mongoose.model('Tekma', tekma);

module.exports = Tekma;


