const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Slider = mongoose.model('Slider', SliderSchema);

module.exports = Slider;