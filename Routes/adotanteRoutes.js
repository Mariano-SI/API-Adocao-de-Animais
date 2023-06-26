const express = require('express');
const router = express.Router();
const Adotante = require('../Model/Adotante')



router.post('/', function(req,res){
    const adotanteInfo = req.body;
    Adotante.createAdotante(adotanteInfo, function(admins){
        res.json(admins)
    })
})


module.exports = router;