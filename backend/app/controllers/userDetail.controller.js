const UserDetailModel = require('../models/user-detail.model');

class UserDetailController{

    getDetails = (req,res,next) =>{
        UserDetailModel.find()
        .then((success)=>{
            res.json({
                data: success,
                msg: "User Detail Lists",
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

    submitDetail = (req,res,next) => {
        const detail = new UserDetailModel(req.body);
        
        detail.save()
        .then((success)=>{
            res.json({
                data: req.body,
                msg: "Successfully added info.",
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

    deleteDetail = (req,res,next) => {
        
        UserDetailModel.findOne({
            _id: req.params.id
        })
        .then((success)=>{
            res.json({
                data: success,
                msg: "User Detail has been deleted",
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

    showDetailById = (req,res,next) => {
        UserDetailModel.findById({
            _id: req.params.id
        })
        .then((success)=>{
            res.json({
                data: success,
                msg: "User Details",
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

module.exports = UserDetailController;