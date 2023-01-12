var express = require('express');
const adminController = require('../app/controllers/admin.controller');

const admin = new adminController();

var router = express.Router();


/* GET users listing. */
//admin
router.route('/')
.get(admin.dashboard);


module.exports = router;
