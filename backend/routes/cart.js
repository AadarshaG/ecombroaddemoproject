const router = require('express').Router();
const CartController = require('../app/controllers/cart.controller');
const cartController = new CartController();

router.route('/')
.get(cartController.getAllData)
.post(cartController.addCart);

router.route('/:id')
.delete(cartController.deleteCartOrder)
.get(cartController.getDataById);


module.exports = router;