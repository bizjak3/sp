const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    ime: {type: String,required: true},
    priimek: {type: String, required: true},
    email: {type: String, unique: true,required: true},
    zgoscenaVrednost: {type: String, required: true},
    nakljucnaVrednost: {type: String, required: true},
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



userSchema.methods.nastaviGeslo = function(geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto
      .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
      .toString('hex');
};

userSchema.methods.preveriGeslo = function(geslo) {
    let zgoscenaVrednost = crypto
      .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
      .toString('hex');
    return this.zgoscenaVrednost == zgoscenaVrednost;
};

userSchema.methods.generirajJwt = function() {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      elektronskiNaslov: this.email,
      ime: this.ime,
      exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
  };
  
const User = mongoose.model('User', userSchema);

module.exports = User;