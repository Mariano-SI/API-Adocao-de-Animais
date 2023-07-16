const express = require('express');
const router = express.Router();
const Adotante = require('../Model/Adotante')


router.get('/', (req, res)=>Adotante.getAllAdotantes( req, res));
router.get('/:cpf',(req, res)=>Adotante.getAdotantesByCPF( req, res));
router.post('/', function(req,res){
    Adotante.createAdotante(req, res)
});
router.delete('/:cpf',(req, res)=>Adotante.deleteAdotantesByCPF( req, res));
router.patch("/:cpf", (req, res)=>Adotante.updateAdotante( req, res))


module.exports = router;