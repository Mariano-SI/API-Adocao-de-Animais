const express = require('express');
const router = express.Router();
const CadAnimal = require('../Model/Animal')

router.get('/home', function(req,res){
    res.status(200).send('API da Casa Quatro Patas');
});


router.get('/', (req,res)=>CadAnimal.getAnimais(res))

router.get('/:id', (req, res)=> CadAnimal.getAnimalById(req, res))

router.post('/', (req,res)=> CadAnimal.createAnimal(req, res))

router.delete('/:id', (req,res)=>CadAnimal.deleteAnimalById(req,res))

router.patch('/:id', (req, res) => CadAnimal.updateAnimal(req, res));

module.exports = router;