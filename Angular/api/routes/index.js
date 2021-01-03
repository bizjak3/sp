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
router.get('/search/:niz', contrHomepage.search)

// Uporabnik
router.get('/uporabnik/:id', contrUporabnik.vrniUporabnikaPrekoId); // Vrne podatke uporabnika
router.post('/spremeni',  contrUporabnik.spremeniUporabnika);
router.post("/pozabilGeslo", contrUporabnik.pozabilGeslo);
router.post('/ocena', contrUporabnik.vrniOcene);
router.post('/zasebnost/:id', contrUporabnik.zasebnost)
router.delete('/izbrisiMe/:id', contrUporabnik.izbrisi)


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

 /**
  * @swagger
  * /search/{niz}:
  *  get:
  *   summary: Iskanje
  *   tags: [Homepage]
  *   parameters:
  *     - in: path
  *       name: niz
  *       schema: 
  *         type: string
  *         example: Janez
  *   responses:
  *     "200":
  *      description: Uspešna zahteva
  *      content:  
  *       application/json:
  *         schema:
  *           type: object
  *           properties: 
  *             tabelaTekem:
  *               type: array
  *               items: 
  *                 tekme:
  *                   $ref: "#/components/schemas/Tekma"
  *             tabelaUporabnikov:
  *               type: array
  *               items:
  *                 uporabniki:
  *                   $ref: "#/components/schemas/Uporabnik"    
  *      "500":
  *       description: Napaka na strežniku pri dostopu do podatkovne baze               
  *                   
  *            
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
 *            $ref: "#/components/schemas/Uporabnik"
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



 /**
 * @swagger
 *   /spremeni:
 *     post:
 *       summary: Spremeni podatke
 *       description: Spremeni lastne podatke
 *       tags: [Uporabnik]
 *       security:
 *        - jwt: [] 
 *       requestBody:
 *         description: Podatki za spremembo
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikSpremeni"
 *       responses:
 *         "201":
 *           description: Uspešna sprememba podatkov
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                  sporočilo:
 *                    type: string
 *                    example: Uspešno spremenjeni podatki 
 *                  status:
 *                    description: Status za prikaz barve bootstrap alerta
 *                    type: string
 *                    example: success                  
 *         "400":
 *           description: Napaka zahteve
 *           content:
 *             application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  sporočilo:
 *                    type: string
 *                    example: Prosim preglej vnešene podatke 
 *                  status:
 *                    description: Status za prikaz barve bootstrap alerta
 *                    type: string
 *                    example: danger  
 *         "401":
 *           description: Unauthorized                   
 *         "500":
 *           description: Napaka na strežniku pri spremembi podatkov.
 */

/**
 * @swagger
 *  /pozabilGeslo:
 *    post:
 *      summary: Pozabljeno geslo
 *      tags: [Uporabnik]
 *      security:
 *        - jwt: [] 
 *      requestBody: 
 *        description: Elektronski naslov na katerega se pošlje novo geslo
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email: 
 *                  type: string
 *                  example: janez.novak@gmail.com
 *      responses:
 *        "201": 
 *          description: Uspešno poslana mail
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  sporočilo:
 *                    type: string
 *                    example: Uspešno poslana mail
 *                  status:
 *                    description: Status za prikaz barve bootstrap alerta
 *                    type: string
 *                    example: success  
 *        "400":
 *          description: Zgrešena mail
 *          content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  sporočilo:
 *                    type: string
 *                    example: Uporabnik s tem elektronskim naslovom ne obstaja
 *                  status:
 *                    description: Status za prikaz barve bootstrap alerta
 *                    type: string
 *                    example: danger
 *        "401":
 *          description: Unauthorized 
 *        "500":
 *          description: Napaka na strežniku     
 */

// TEKME ---------------------------------------------------------------------------------------------------------------

/**
 * @swagger
 * /tekma/{idTekme}/tekme:
 *  get:
 *    summary: Podatki določene tekme
 *    tags: [Tekme]
 *    parameters:
 *      - in: path
 *        name: idTekme
 *        example: 123ID321
 *    responses: 
 *      "200":
 *       description: Uspešna zahteva podatkov tekme
 *       content:
 *          application/json:
 *            schema:
 *             $ref: "#/components/schemas/Tekma"
 *      "404":
 *       description: Iskana tekma ne obstaja
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sporocilo: 
 *                   type: string
 *                   example: Iskana tekma ne obstaja
 *      "500":
 *        description: Napaka na strežniku 
 */

/**
 * @swagger
 * /novaTekma/{idUporabnika}:
 *  post:
 *    summary: Ustvari tekmo
 *    tags: [Tekme]
 *    security:
 *      - jwt: [] 
 *    parameters: 
 *      - in: path
 *        name: idUporabnika
 *        schema:
 *          type: string
 *          example: 5fee14a5303e553910497bea
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UstvariTekmo"
 *    responses:
 *      "201":
 *        description: Uspešno ustvarjena tekma
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sporočilo:
 *                  type: string
 *                  example: Uspešno ustvarjena tekma
 *                status:
 *                  description: Status za prikaz barve bootstrap alerta
 *                  type: string
 *                  example: success
 *      "400":
 *        description: Napaka zahteve
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sporočilo:
 *                  type: string
 *                  example: Prosim vnesite kraj, datum in uro tekme
 *                status:
 *                  description: Status za prikaz barve bootstrap alerta
 *                  type: string
 *                  example: danger 
 *      "401":
 *       description: Unathorized
 *      "500":
 *        description: Napaka na strežniku
 */

/**
 * @swagger
 * /tekma/{idTekme}/spremeniTekmo:
 *  post:
 *    summary: Spremeni podatke tekme
 *    tags: [Tekme]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: idTekme
 *        example: 123IdTekme123 
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              datum: 
 *                type: string
 *              ura: 
 *                type: string
 *              opis: 
 *                type: string
 *    responses:
 *      "201": 
 *       description: Uspešno spremenjeni podatki tekme
 *      "401":
 *       description: Unauthorized
 *      "500":
 *       description: Napaka na strežniku 
 */

/**
 * @swagger
 * /prijaviSe/{idTekme}:
 *  put:
 *    summary: Prijavi se na tekmo
 *    tags: [Tekme]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: idTekme
 *        example: 123IdTekme123
 *    requestBody:
 *      content:
 *        application/json:
 *          type: object
 *          properties: 
 *            id: 
 *            type: string
 *            example: 123IdUporabnika321
 *    responses:
 *      "200": 
 *       description: Uspešno prijavljen na tekmo
 *      "401":
 *       description: Unauthorized
 *      "409":
 *       description: Uporabnik je že prijavljen
 *      "500":
 *       description: Napaka na strežniku
 */

 /**
 * @swagger
 * /odjaviSe/{idTekme}:
 *  put:
 *    summary: Prijavi se na tekmo
 *    tags: [Tekme]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: idTekme
 *        example: 123IdTekme123
 *    requestBody:
 *      content:
 *        application/json:
 *          type: object
 *          properties: 
 *            id: 
 *            type: string
 *            example: 123IdUporabnika321
 *    responses:
 *      "200": 
 *       description: Uspešno odjavljen od tekme
 *      "409":
 *       description: Uporabnik je že odjavljen
 *      "401":
 *       description: Unauthorized
 *      "500":
 *       description: Napaka na strežniku
 */

/**
 * @swagger
 * /tekma/{idTekme}/spremeniStatus:
 *  put:
 *    summary: Spremeni status tekme
 *    tags: [Tekme]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: idTekme
 *        example: 123IdTekme123
 *    responses:
 *      "401":
 *        description: Unauthorized
 *      "200": 
 *       description: Uspešno spremenjen status tekme
 *      "500":
 *       description: Napaka na strežniku
 */

 /**
 * @swagger
 * /tekma/{idTekme}/izbrisi:
 *  delete:
 *    summary: Izbriši tekmo
 *    tags: [Tekme]
 *    security:
 *      - jwt: []
 *    parameters:
 *      - in: path
 *        name: idTekme
 *        example: 123IdTekme123
 *    responses:
 *      "401":
 *        description: Unauthorized
 *      "200": 
 *       description: Uspešno izbrisana tekma
 *      "500":
 *       description: Napaka na strežniku
 */

