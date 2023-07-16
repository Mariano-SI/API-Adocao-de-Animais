const express = require('express');
const router = express.Router();
const CadAnimal = require('../Model/Animal');

router.get('/home', function (req, res) {
  res.status(200).send('API da Casa Quatro Patas');
});

//busca todos os animais
router.get('/', function (req, res) {
  CadAnimal.getAnimal(res);
});

//busca animal por id
router.get('/:id', function (req, res) {
  const id = req.params.id;
  CadAnimal.getAnimalById(id, function (animal) {
    res.json(animal);
  });
});

//post para salvar um animal
router.post('/', function (req, res) {
  const animal = req.body;
  CadAnimal.createAnimal(animal, function (animal) {
    res.json({ msg: 'Animal inserido com sucesso' });
  });
});
//put para atualizar um animal
router.put('/:id', function (req, res) {
  const id = req.params.id;
  const { nome, especie, porte, sexo, idade } = req.body;

  CadAnimal.updateAnimal(id, { nome, especie, porte, sexo, idade }, res);
});

module.exports = router;
