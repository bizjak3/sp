const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telefon: {
        type: String
    },
    emailOdpade: {
        type: Boolean,
        default: true
    },
    emailPrihaja: {
        type: Boolean,
        default: true
    },
    emailDrugi: {
        type: Boolean,
        default: true
    },
    telDrugi: {
        type: Boolean,
        default: true
    },
    ocena: {
        type: Number,
        default: 0
    },
    steviloOcen: {
        type: Number,
        default: 1
    },
    banned: {
        type: Boolean,
        default: false
    },
    bannedDate: {
        type: Date
    },
    tekme:{
        type: [String]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;