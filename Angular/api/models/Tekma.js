const mongoose = require('mongoose');


var dateFormat = {
    short: "DD MMMM - YYYY",
};
var hourFormat = {
    short: "HH - MM",
};

const tekma = new mongoose.Schema({
    
    kreator: {
        type: Object,
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
        type: [Object],
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

/**
 * @swagger
 * components:
 *  schemas:
 *   Tekma:
 *    type: object
 *    description: Podatki o tekmi
 *    properties:
 *     kreator:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        example: 43g4h3uh41j41iu4h124
 *       ime:
 *        type: string
 *        example: Janez
 *       priimek: 
 *        type: string
 *        example: Novak
 *     lat:
 *      type: number
 *      example: 45.4545454545
 *     lng: 
 *      type: number
 *      example: 12.1212121211
 *     kraj:
 *      type: string
 *      example: Teslova ulica 20, Ljubljana
 *     datum: 
 *      type: string
 *      example: 20.10.2021
 *     ura:
 *      type: string
 *      example: 15.30
 *     minIgralcev:
 *      type: number
 *      description: Minimalno število igralcev da se tekma izvede
 *      example: 8
 *     maxIgralcev:
 *      description: Največje število igralcev na tekmi
 *      type: number
 *      example: 16
 *     prijavljeni:
 *      description: Število prijavljenih igralcev na tekmo
 *      type: number
 *      example: 6
 *     opis:
 *      description: Opis tekme
 *      type: string
 *      example: Prosim prinesite žogo
 *     igralci:
 *      type: array
 *      items:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 *         example: 43g4h3uh41j41iu4h124
 *        ime:
 *         type: string
 *         example: Janez
 *        priimek: 
 *         type: string
 *         example: Novak
 *     status:
 *      type: string
 *      description: Ali je tekma zaključena
 *     zeOcenili:
 *      description: Igralci, ki se že ocenili druge igralce na tej tekmi
 *      type: array
 *      items:
 *       type: string
 *       example: jh414jkhkopj5k3j5
 *   UstvariTekmo:
 *      type: object
 *      properties:
 *          lat:
 *           type: number
 *           example: 45.45454
 *          lng: 
 *           type: number
 *           example: 22.2222 
 *          kraj: 
 *           type: string
 *           example: Teslova Ulica 50, Ljubljana
 *          datum:
 *           type: string
 *           example: 24.05.2021
 *          ura: 
 *           type: string
 *           example: 15.30
 *          minIgralcev:
 *           type: number
 *           description: Minimalno število igralcev da se tekma izvede
 *           example: 8
 *          maxIgralcev:
 *           description: Največje število igralcev na tekmi
 *           type: number
 *           example: 16
 *          opis:
 *           description: Opis tekme
 *           type: string
 *           example: Prosim prinesite žogo
 *          prijavljeni:
 *           description: Število prijavljenih igralcev na tekmo
 *           type: number
 *           example: 6           
 */

