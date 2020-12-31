const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

const registracija = (req, res) => {
    if (!req.body.ime || !req.body.email|| !req.body.geslo) {
      return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    const uporabnik = new User();
    uporabnik.ime = req.body.ime;
    uporabnik.priimek = req.body.priimek;
    uporabnik.email = req.body.email;
    uporabnik.nastaviGeslo(req.body.geslo);
    uporabnik.save(napaka => {
      if (napaka) {
        if (napaka.code == 11000) {
          res.status(400).json({"sporočilo": "Uporabnik s tem elektronskim naslovom je že registriran"});
        }
        else {
          res.status(500).json({"sporočilo": napaka});
        }
      } else {
        res.status(200).json({"žeton": uporabnik.generirajJwt()});
      }
    });
  };

  const prijava = (req, res) => {
    if (!req.body.email || !req.body.geslo) {
      return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
      if (napaka)
        return res.status(500).json(napaka);
      if (uporabnik) {
        res.status(200).json({"žeton": uporabnik.generirajJwt()});
      } else {
        res.status(401).json(informacije);
      }
    })(req, res);
  };  

  module.exports = {
    registracija,
    prijava
  };