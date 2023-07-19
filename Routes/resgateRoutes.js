const express = require('express');
const router = express.Router();
const Resgate = require('../Model/Resgate');

const resgate = new Resgate();
router.get('/', (req, res) => resgate.getAllResgates(req, res));
router.get('/:idResgate', (req, res) =>
  resgate.getResgateByidResgate(req, res),
);
router.post('/', (req, res) => resgate.createResgate(req, res));
//router.delete('/:cpf',(req, res)=> resgate.deleteResgateByidResgate( req, res));
router.patch('/:idAnimal', (req, res) => resgate.updateResgateById(req, res));

module.exports = router;
