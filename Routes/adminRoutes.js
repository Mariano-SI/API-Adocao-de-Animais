const express = require('express');
const router = express.Router();
const Admin = require('../Model/Admin')


const admin = new Admin();

router.get('/', function(req,res){
    admin.getAdmins(res)
})

module.exports = router;