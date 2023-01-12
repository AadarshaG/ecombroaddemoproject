
const isAdmin = function(req,res,next){
    if(req.user.is_admin){
        next();
    }else{
        next('Unauthorized User.');
    }
}

module.exports = isAdmin;