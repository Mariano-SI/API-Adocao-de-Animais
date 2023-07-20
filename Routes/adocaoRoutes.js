const express = require('express');
const router = express.Router();
const Adocao = require('../Model/Adocao');

const adocao = new Adocao()
router.get('/', (req, res)=> adocao.getAllAdocao( req, res));
router.get('/:idAdocao',(req, res)=> adocao.getAdocaoById( req, res));
router.post('/', (req,res)=> adocao.createAdocao(req, res));
router.delete('/:idAdocao',(req, res)=> adocao.deleteAdocaoById( req, res));
router.patch("/:idAdocao", (req, res)=> adocao.updateAdocao( req, res))

module.exports = router;