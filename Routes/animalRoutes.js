const express = require('express');
const router = express.Router();
const CadAnimal = require('../Model/Animal')

router.get('/home', function(req,res){
    res.status(200).send('API da Casa Quatro Patas');
});

//busca todos os animais
router.get('/', (req,res)=>CadAnimal.getAnimais(res))

//busca animal por id
router.get('/:id', (req, res)=> CadAnimal.getAnimalById(req, res))

//post para salvar um animal
router.post('/', (req,res)=> CadAnimal.createAnimal(req, res))

router.delete('/:id', (req,res)=>CadAnimal.deleteAnimalById(req,res))
//put para atualizar um animal
router.put('/:id', function(req,res){
    const id = req.params.id;
    const {nome, especie, porte, sexo, idade, descricao} = req.body;

    CadAnimal.updateAnimal(id, {nome, especie, porte, sexo, idade, descricao}, function(){
        res.json({msg:"Registro atualizado com sucesso!"});
    })

});

module.exports = router;