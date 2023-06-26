const express = require('express');
const router = express.Router();
const Resgate = require('../Model/Resgate')



router.post('/', function(req,res){
    const resgateInfo = req.body;
    Resgate.createResgate(resgateInfo, function(admins){
        res.json(admins)
    })
})


module.exports = router;