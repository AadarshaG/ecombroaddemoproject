const router = require('express').Router();

const SliderController = require('../app/controllers/slider.controller');
const sliderController = new SliderController();

const uploader = require('../app/middleware/uploader');

router.route('/')
.get(sliderController.getAllSlider)
.post(uploader.single('image'),sliderController.addSlider);

router.route('/:id')
.put(uploader.single('image'),sliderController.updateSlider)
.delete(sliderController.deleteSlider)
.get(sliderController.getSliderById);


module.exports = router;