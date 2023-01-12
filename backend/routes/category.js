const router = require('express').Router();

const CategoryController = require('../app/controllers/category.controller');
const categoryController = new CategoryController();

const uploader = require('../app/middleware/uploader');

router.route('/')
.get(categoryController.getAllCategory)
.post(uploader.single('image'),categoryController.addCategory);

router.route('/:id')
.put(uploader.single('image'),categoryController.updateCategory)
.delete(categoryController.deleteCategory)
.get(categoryController.getCategoryById);


module.exports = router;