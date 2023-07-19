const express = require('express');
const router = express.Router();
const Adotante = require('../Model/Adotante');

const adotante = new Adotante();
router.get('/', (req, res) => adotante.getAllAdotantes(req, res));
router.get('/:cpf', (req, res) => adotante.getAdotantesByCPF(req, res));
router.post('/', (req, res) => adotante.createAdotante(req, res));
router.delete('/:cpf', (req, res) => adotante.deleteAdotantesByCPF(req, res));
router.patch('/:cpf', (req, res) => adotante.updateAdotante(req, res));

module.exports = router;
