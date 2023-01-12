const SliderModel = require('../models/slider.model');

class SiderController{

    getAllSlider = (req,res,next) => {
        SliderModel.find()
        .then((slider) => {
            res.json({
                data: slider,
                msg: "Slider Image Lists.",
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
    

    addSlider = (req,res,next) => {
        const slider = new SliderModel(req.body);
        
        if(req.file.filename){
            slider.image = req.file.filename;
        }

        slider.save()
        .then((success) => {
            res.json({
                data: req.body,
                msg: "Slider Image Added Successfully.",
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

    updateSlider = (req,res,next) => {
        const {body} = req;

        if(req.file){
            body.image = req.file.filename;
        }

        SliderModel.updateOne(
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
                msg: "Slider Image Updated Successfully.",
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

    deleteSlider = (req,res,next) => {
        SliderModel.deleteOne(
            {
                _id: req.params.id
            }
        )
        .then((success) => {
            res.json({
                data: JSON.stringify(success),
                msg: "Slider Image Deleted Successfully.",
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

    getSliderById = (req,res,next) => {
        SliderModel.findById(
            {
                _id: req.params.id
            }
        )
        .then((slider) => {
            res.json({
                data: slider,
                msg: "Slider Image Details.",
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

module.exports = SiderController;



// const updateImage = (request, data, path) => {
//     const { files } = request;
//     if (files) {
//       let old_images = data.image;
//       let images = [];
//       // console.log("data :" + data);
//       if (old_images) {
//         console.log("here " + old_images);
//         images = old_images.split(",");
//       }
  
//       for (file in files) {
//         for (i = 0; i < path.length; i++) {
//           for (j = 0; j < files[file].length; j++) {
//             if (files[file][j].fieldname == path[i]) {
//               if (files[file].length > 1) {
//                 images.push(files[file][j].filename);
//               } else {
//                 data[path[i]] = files[file][j].filename;
//                 console.log("here");
//               }
//             }
//           }
  
//           data[path[i]] = images;
//         }
//       }
//     }
//     return data;
//   };