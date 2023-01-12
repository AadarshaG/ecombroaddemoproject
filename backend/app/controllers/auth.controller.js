const UserModel = require('../models/user.model');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../../config/index');

function  tokenGenerate(user){
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin 
    }, jwt_secret); 

    return token;
}

class AuthController{
    login(req,res,next){
        UserModel.findOne({
            email: req.body.email
        })
        .then((user)=>{
            
            if(!passwordHash.verify(req.body.password,user.password)){
                res.status(401).json({
                    msg: "Password does not match",
                    data: null,
                    status: 401
                });
            }    
            // generate token
    
            res.json({
                msg: "User  found",
                data: {
                    user: user,
                    token: tokenGenerate(user)
                },
                status: 200
            });
        })
        .catch((err)=>{
            res.status(404).json({
                msg: "User not found",
                data: null,
                status: 404
            });
        })
    }
}

module.exports = AuthController;