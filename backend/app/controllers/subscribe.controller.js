const SubscribeModel = require('../models/subscribe.model');

class SubscribeController{

    getAllSubscriber = (req,res,next) => {
        SubscribeModel.find()
        .then((subscribe) =>{
            res.json({
                data: subscribe,
                msg: "Subscriber Lists",
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

    addSubscriber = (req,res,next) => {
        const subscribe = new SubscribeModel(req.body);
        // console.log('Subscriber Data',subscribe);
        subscribe.save()
        .then((success)=>{
            res.json({
                data: req.body,
                msg: "Subscribe Successfully.",
                status: true
            })
        })
        .catch((error) =>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    deleteSubscriber = (req,res,next) => {
        SubscribeModel.findOne({
            _id: req.params.id
        })
        .then((success) => {
            res.json({
                data: JSON.stringify(success),
                msg: "Subscriber Deleted Successfully.",
                status: true
            })
        })
        .catach((error) =>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }
}

module.exports = SubscribeController;