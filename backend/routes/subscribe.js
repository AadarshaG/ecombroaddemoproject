const router = require('express').Router();

const SubscribeController = require ('../app/controllers/subscribe.controller');
const subscribeController = new SubscribeController();

router.route('/')
.get(subscribeController.getAllSubscriber)
.post(subscribeController.addSubscriber);

router.route('/:id')
.delete(subscribeController.deleteSubscriber);

module.exports = router;