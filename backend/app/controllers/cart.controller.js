const CartModel = require('../models/cart.model');

class CartController{

    getAllData = (req,res,next) => {
        CartModel.find()
        .populate(['user_id','product_id'])
        .then((success)=>{
            res.json({
                data: success,
                msg: "Order Lists",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    addCart = (req,res,next) => {
        CartModel.insertMany(req.body)
        .then((response)=>{
            res.json({
                data: req.body,
                msg: "Order created successfully",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: "Order could not be created",
                status: false
            })
        })
    }

    deleteCartOrder = (req,res,next) =>{
        CartModel.findOne({
            _id: req.params.id
        })
        .then((success)=>{
            res.json({
                data: success,
                msg: "Order deleted successfully",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    getDataById = (req,res,next) => {
        CartModel.findById({
            _id: req.params.id
        })
        .populate(['user_id','product_id'])
        .then((order)=>{
            res.json({
                data: order,
                msg: "Cart Detail",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }
}

module.exports = CartController;



// router.post('/',(req,res,next) =>{
//     Cart.insertMany(req.body)
//     .then((response)=>{
//         res.json({
//             data: req.body,
//             msg: "Order created successfully",
//             status: true
//         })
//     })
//     .catch((error)=>{
//         res.json({
//             data: null,
//             msg: "Order could not be created",
//             status: false
//         })
//     })
// })