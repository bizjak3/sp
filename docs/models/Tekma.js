const mongoose = require('mongoose');


var dateFormat = {
    short: "DD MMMM - YYYY",
};
var hourFormat = {
    short: "HH - MM",
};

const tekma = new mongoose.Schema({
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
    }
});

const Tekma = mongoose.model('Tekma', tekma);

module.exports = Tekma;


