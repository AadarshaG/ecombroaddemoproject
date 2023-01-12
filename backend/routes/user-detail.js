const router = require('express').Router();

const UserDetailController = require('../app/controllers/userDetail.controller');
const userDetailController = new UserDetailController();

router.route('/')
.get(userDetailController.getDetails)
.post(userDetailController.submitDetail);

router.route('/:id')
.delete(userDetailController.deleteDetail)
.get(userDetailController.showDetailById);

module.exports = router;
