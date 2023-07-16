const express = require('express');
const router = express.Router();
const Admin = require('../Model/Admin')



router.get('/', function(req,res){
    Admin.getAdmins(res)
})

module.exports = router;