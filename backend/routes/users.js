var express = require('express');
var router = express.Router();

const controller = require('../app/controllers/user.controller');
const uploader = require('../app/middleware/uploader');

const userController = new controller();

/* GET users listing. */
//admin
router.route('/')
.post(uploader.single('image'),userController.registerUser)
.get(userController.getAllUsers);

router.route('/:id')
.get(userController.getUserById)
.put(uploader.single('image'),userController.updateUserById)
.delete(userController.deleteUserById);

module.exports = router;
