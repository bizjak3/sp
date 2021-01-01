const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Sheme uporabnikov
/**
 * @swagger
 * components:
 *  schemas:
 *   UporabnikPrijava:
 *    type: object
 *    description: Podatki uporabnika za prijavo
 *    properties:
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: janez@novak.com
 *     geslo:
 *      type: string
 *      format: password
 *      example: test123
 *    required:
 *     - elektronskiNaslov
 *     - geslo
 *   UporabnikRegistracija:
 *    type: object
 *    description: Podatki uporabnika za registracijo
 *    properties:
 *     ime:
 *      type: string
 *      writeOnly: true
 *      example: Janez
 *     priimek:
 *      type: string
 *      writeOnly: true
 *      example: Novak
 *     email:
 *      type: string
 *      example: janez@novak.com
 *     geslo:
 *      type: string
 *      format: password
 *      example: geslo123
 *    required:
 *     - ime
 *     - priimek
 *     - email
 *     - geslo
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Parametri so obvezni.
 *   Uporabnik:
 *    type: object
 *    properties:
 *     ime: 
 *      type: string
 *      example: Janez
 *     priimek: 
 *      type: string
 *      example: Novak
 *     email:
 *      type: string
 *      example: janez@novak.com
 *     zgoscenaVrednost: 
 *      type: string
 *     nakjlucnaVrednost:
 *      type: string
 *     telefon:
 *      type: string
 *      example: 123456789
 *     ocena:
 *      type: number
 *      example: 5
 *     steviloOcen: 
 *      type: number
 *      example: 45
 *     admin:
 *       type: boolean
 *       description: Ali je uporabnik admin
 *       example: true 
 *     tekme:
 *      description: Tekme na ketere je prijavljen uporabnik
 *      type: array
 *      items:
 *       type: object
 *       properties:
 *        id: 
 *         type: string
 *         example: dkj3j1hk3nejn32323
 *        kraj: 
 *         type: string
 *         example: Teslova Ulica 50, Ljubljana
 *        datum: 
 *         type: string
 *         example: 24.05.2021
 *        ura:
 *         type: string
 *         example: 15.30
 *   UporabnikSpremeni:
 *    type: object
 *    description: Podatki za spremembo lastnih podatkov
 *    properties:
 *     id:
 *      type: string
 *      exmple: gh3g2h313123
 *     ime:
 *      type: string
 *      writeOnly: true
 *      example: Janez
 *     priimek:
 *      type: string
 *      writeOnly: true
 *      example: Novak
 *     email:
 *      type: string
 *      example: janez@novak.com
 *     telefon:
 *      type: string
 *      example: 123456789
 *     geslo:
 *      type: string
 *      format: password
 *      example: geslo123
 *    required:
 *     - ime
 *     - priimek
 *     - email
 *     - geslo
 */

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
        type: [Object]
    },
    admin: {
        type: Boolean,
        default: false // admin, user
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
      mail: this.email,
      exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
  };
  
const User = mongoose.model('User', userSchema);

module.exports = User;