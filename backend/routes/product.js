
const router = require('express').Router();
// const IsLoggedIn = require('../app/middleware/isLoggedIn');
// const IsAdmin = require('../app/middleware/isAdmin');
const ProductController = require('../app/controllers/product.controller');
const productController = new ProductController();

const uploader = require('../app/middleware/uploader');

router.route('/')
.get(productController.getProduct)
 .post( uploader.single('image'),productController.addProduct);

router.route('/:id')
.put( uploader.single('image'),productController.updateProduct)
.delete( productController.deleteProduct)
.get(productController.getProductById);


module.exports = router;