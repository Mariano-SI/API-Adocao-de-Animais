const express = require('express');
const router = express.Router();
const Resgate = require('../Model/Resgate')


const resgateMethods = new Resgate()
router.post('/', function(req,res){
    const resgateInfo = req.body;
    resgateMethods.createResgate(resgateInfo, function(admins){
        res.json(admins)
    })
})


module.exports = router;