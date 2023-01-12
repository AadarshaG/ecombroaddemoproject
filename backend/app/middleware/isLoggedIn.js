const jwt = require('jsonwebtoken');
const jwt_secret = require('../../config/index');
const UserModel = require('../models/user.model');

const isLoggedIn = function(req,res,next){
    let token = null;
    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }
    if(req.headers['x-access-token']){
        token = req.headers['x-access-token'];
    }
    if(req.query.token){
        token = req.query.token;
    }
    if(token === null){
        next('Unauthorization access.');
    }

    const data = jwt.verify(token, jwt_secret);

    const _id = data._id;

    UserModel.findById(_id)
    .then((user)=>{
        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin
        }
        next();
    })
    .catch((err)=>{
       next(err);
    })
}

module.exports = isLoggedIn;