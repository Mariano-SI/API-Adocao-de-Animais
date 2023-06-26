const express = require('express');
const router = express.Router();
const Admin = require('../Model/Admin')



router.get('/', function(req,res){
    Admin.getAdmins(function(admins){
        res.json(admins)
    })
})


router.get('/:id', function(req,res){
    const id = req.params.id;
    Admin.getAdminById(id, function(admin){
        res.json(admin)
    })
})


module.exports = router;