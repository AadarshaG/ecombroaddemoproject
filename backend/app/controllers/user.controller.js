const UserModel = require('../models/user.model');

const passwordHash = require('password-hash');



class UserController{
    registerUser(req,res,next){
        const user = new UserModel(req.body);

       if(req.file){
        user.image = req.file.filename;
       }

       //password hashing
       user.password = passwordHash.generate(req.body.password);

        user.save()
        .then((success)=>{
          res.json({
            data: req.body,
            msg: "User register successfully.",
            status: 200
          })
        })
        .catch((error)=>{
          res.json({
            data: req.body,
            msg: "Error while registering user.",
            status: 400
          })
        })
    }

    getAllUsers(req, res, next) {
        UserModel.find({},'', function(err, success){
          if(err){ 
            res.json(err);
          }else{
            res.json(success);
          }
        });
    }

    getUserById(req,res,next){
        UserModel.findOne({
          _id: req.params.id
        })
        .then((user)=>{
          res.json(user)
        })
        .catch((errs)=>{
          res.json(errs);
        })
    }

    updateUserById(req,res,next){
        UserModel.updateOne({
          _id: req.params.id
        },
        {
          $set: req.body
        },
        {
          upsert: true
        })
        .then((success)=>{
          res.json(req.body)
        })
        .catch((errs)=>{
          res.json(errs);
        })
    }

    deleteUserById(req,res,next){
        UserModel.deleteOne({
          _id: req.params.id
        })
        .then((success)=>{
          res.json(success)
        })
        .catch((errs)=>{
          res.json(errs);
        })
    }
}

module.exports = UserController;