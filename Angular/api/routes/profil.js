const express = require('express');
const router = express.Router();


const controller = require('../controllers/profil')

router.get("/user", controller.getUser)

router.post("/user", controller.registriraj)



module.exports = router;