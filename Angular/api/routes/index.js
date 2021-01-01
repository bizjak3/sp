const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: 'payload',
  algorithms: ['HS256']
});

var contrAvtentikacija = require('../controllers/avtentikacija')
var contrHomepage = require('../controllers/homepage')
var contrUporabnik = require('../controllers/uporabnik')
var controller = require('../controllers/tekma')

// Avtentikacija
router.post('/registracija', contrAvtentikacija.registracija); // Registracija
router.post('/prijava', contrAvtentikacija.prijava); // Prijava

// Homepage
router.get('/page/:p/:d', contrHomepage.homepage); // Pridobi tekme (pagination, filter)
router.get("/tekme", contrHomepage.tekme) // Pridobi stevilo vseh tekem
router.get("/markers", contrHomepage.markers) // Pridobi tekme za markerje

// Uporabnik
router.get('/uporabnik/:id', contrUporabnik.vrniUporabnikaPrekoId); // Vrne podatke uporabnika
router.post('/spremeni',  contrUporabnik.spremeniUporabnika);
router.post("/pozabilGeslo", contrUporabnik.pozabilGeslo)

// Tekme
router.get('/tekma/:id/tekme', controller.podrobnostiTekme)
router.post('/novaTekma/:id', avtentikacija,  controller.ustvariTekmo);
router.post('/tekma/:id/spremeniTekmo',  controller.spremeniTekmo);
router.put('/prijaviSe/:id', avtentikacija, controller.prijaviSeNaTekmo);
router.put('/odjaviSe/:id', avtentikacija, controller.odjaviSeOdTekme);
router.get('/tekma/:id/izbrisi',  controller.izbrisiTekmo)
router.post('/tekma/:id/oceni/:user',  controller.oceniIgralce);
router.put('/tekma/:id/spremeniStatus', controller.spremeniStatus);

module.exports = router;


// SWAGGER  ------------------------------------------------------------------------------------------------------------

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Avtentikacija
 *    description: Obvladovanje uporabnikov
 *  - name: Homepage 
 *    description: Pridobivanje podatkov za prikaz na začetni strani
 *  - name: Uporabnik
 *    description: Obvladovanje podatkov uporabnika
 *  - name: Tekme
 *    description: Obvladovanje tekem
 */

 /**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

// AVTENTIKACIJA -------------------------------------------------------------------------------------------------------

/**
 * @swagger
 *   /registracija:
 *     post:
 *       summary: Registracija novega uporabnika
 *       description: Registracija **novega uporabnika** s podatki o imenu, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za registracijo
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikRegistracija"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             example:
 *               sporočilo: Zahtevani so vsi podatki.
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */

 /**
 * @swagger
 *   /prijava:
 *     post:
 *       summary: Prijava uporabnika
 *       description: Prijava **uporabnika** z elektronskiv naslovom in geslom
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za prijavo
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikPrijava"
 *       responses:
 *         "200":
 *           description: Uspešna prijava.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka pri prijavi
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                  sporočilo:
 *                   type: string
 *                   example: Napačno uporabniško ime ali geslo
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */


// HOMEPAGE ------------------------------------------------------------------------------------------------------------
 /**
 * @swagger
 *  /page/{stran}/{filter}:
 *   get:
 *    summary: Tekme prikazane na začetni strani
 *    description: Pridobitev tekem glede na izbrano stran in izbran filter
 *    tags: [Homepage]
 *    parameters:
 *     - in: path
 *       name: stran
 *       description: Izbrana stran
 *       schema:
 *       type: number
 *       example: 1
 *     - in: path
 *       name: filter
 *       description: Izbran filter 
 *       schema:
 *        type: number
 *        example: 1
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s podrobnostmi tekem.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

 /**
 * @swagger
 *  /tekme:
 *   get:
 *    summary: Število vseh tekem
 *    description: Pridobitev števila tekem za prikaz po straneh
 *    tags: [Homepage]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s številom tekem.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              stevilo:
 *                type: number
 *                example: 30
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

 /**
 * @swagger
 *  /markers:
 *   get:
 *    summary: Podatki vseh tekem
 *    description: Pridobitev podatkov vseh tekem za izris markerjev
 *    tags: [Homepage]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s podatki tekem.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Tekma"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

// UPORABNIK -----------------------------------------------------------------------------------------------------------

/**
 * @swagger
 *  /uporabnik/{idUporabnika}:
 *   get:
 *    summary: Podatki uporabnika
 *    description: Podatki registriranega uporabnika
 *    tags: [Uporabnik]
 *    parameters:
 *     - in: path
 *       name: idUporabnika 
 *       schema: 
 *        type: string
 *        example: 5fee14a5303e553910497bea
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s podatki uporabnika.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/User"
 *     "404":
 *      description: Uporabnik ne obstaja
 *      content: 
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            sporočilo:
 *             type: string
 *             example: "Uporabnik s tem ID-jem ne obstaja"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */