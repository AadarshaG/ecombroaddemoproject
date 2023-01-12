const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    review:{
        type: String,
        required: true
    },
    rate:{
        type: Number,
        min: 0,
        max: 5
    }
},{
    timestamps: true
});

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    discount: {
        type: Number,
        required: false,
        min: 0,
        max: 99
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    cat_id :{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    child_cat_id: {
        type:mongoose.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    image: String,
    status: {
        type: String,
        enum: ['Active','Inactive'],
        default: 'Inactive'
    },
    review: [ReviewSchema]
},{
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;