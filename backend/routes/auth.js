const express = require('express');

const AuthController = require('../app/controllers/auth.controller');

const authController = new AuthController();



const router = express.Router();

router.post('/login',authController.login);

module.exports = router;   