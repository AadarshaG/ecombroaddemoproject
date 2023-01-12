const AboutModel = require('../models/about.model');

class AboutController{

    getAbout = (req,res,next) => {
        AboutModel.find()
        .then((about) => {
            res.json({
                data: about,
                msg: "About List.",
                status: true
            })
        })
        .catch((error) => {
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    addAbout = (req,res,next) => {
        const about = new AboutModel(req.body);

        if(req.file.filename){
            about.image = req.file.filename;
        }

        about.save()
        .then((about) => {
            res.json({
                data: req.body,
                msg: "About Added Successfully.",
                status: true
            })
        })
        .catch((error) => {
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    updateAbout = (req,res,next) => {
        const {body} = req;
        if(req.file){
            body.image = req.file.filename;
        }
        AboutModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: body
            },
            {
                upsert: true
            }
        )
        .then((success) => {
            res.json({
                data: req.body,
                msg: "About Updated Successfully.",
                status: true
            })
        })
        .catch((error) => {
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    deleteAbout = (req,res,next) => {
        AboutModel.deleteOne(
            {
                _id: req.params.id
            }
        )
        .then((success) => {
            res.json({
                data: JSON.stringify(success),
                msg: "About Deleted Successfully.",
                status: true
            })
        })
        .catch((error) => {
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    getAboutById = (req,res,next) => {
        AboutModel.findById(
            {
                _id: req.params.id
            }
        )
        .then((about) => {
            res.json({
                data: about,
                msg: "About Detail.",
                status: true
            })
        })
        .catch((error) => {
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })

    }
}

module.exports = AboutController;