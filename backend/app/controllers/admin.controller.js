class AdminController{
    dashboard(req,res,next){
        res.json({
            data: req.user,
            status: 200,
            msg: "Welcome to admin "+req.user.name
        })
    }
}

module.exports = AdminController;