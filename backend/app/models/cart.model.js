const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    // detail_id: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: "UserDetail"
    // },
    qty: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['new','dispatch','delivered','cancelled'],
        default: 'new'
    },
},{
    timestamps: true
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;