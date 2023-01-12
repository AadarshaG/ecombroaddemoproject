const router = require('express').Router();

const AboutController = require('../app/controllers/about.controller');
const aboutController = new AboutController();

const uploader = require('../app/middleware/uploader');

router.route('/')
.get(aboutController.getAbout)
 .post(uploader.single('image'),aboutController.addAbout);

router.route('/:id')
.put(uploader.single('image'),aboutController.updateAbout)
.delete(aboutController.deleteAbout)
.get(aboutController.getAboutById);


module.exports = router;