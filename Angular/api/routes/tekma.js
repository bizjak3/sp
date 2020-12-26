const express = require('express');
const router = express.Router();
const Tekma = require('../models/Tekma')

router.get('/tekma/:id/tekme', (req, res) => {
    console.log("parametri: " + req.params.id)
    Tekma.find({
        _id: req.params.id
    }).then((tekma) => {
        res.send(tekma)
    })
})

module.exports = router;