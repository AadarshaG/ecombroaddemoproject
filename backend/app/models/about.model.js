const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String
},{
    timestamps: true
});

const About = mongoose.model('About', AboutSchema);

module.exports = About;