const ProductModel = require('../models/product.model');

class ProductController{
    
    getProduct = (req,res,next) => {
        let filter;
        let query = req.query;
        if(req.user && req.user.is_admin){
            filter = {}
        }
        if(query){
            filter = { name: { $regex: query.keyword, $options: 'i' }};
        }else{
            //
        }
        ProductModel.find()
        .populate('cat_id')
        .then((products) => {
            res.json({
                data: products,
                msg: "Product Lists.",
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

    addProduct = (req,res,next) => {
       const product = new ProductModel(req.body);

       if(req.file.filename){
        product.image = req.file.filename;
       }

       if(product.child_cat_id == '' || product.child_cat_id == null ){
        product.child_cat_id = null;
        }

       product.save()
        .then((success) => {
            res.json({
                data: req.body,
                msg: "Product Added Successfully.",
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

    updateProduct = (req,res,next) => {
        let data = req.body;


        if(data.child_cat_id == '' || data.child_cat_id == null ){
            data.child_cat_id = null;
        } 

        data.is_featured = req.body.is_featured ? true : false; 

        if(req.file){
            data.image = req.file.filename;
        }
        
        ProductModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: data
            },
            {
                upsert: true
            }
        )
        .then((success) => {
            res.json({
                data: req.body,
                msg: "Product Updated Successfully.",
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

    deleteProduct = (req,res,next) => {
        ProductModel.deleteOne(
            {
                _id: req.params.id
            }
        )
        .then((success) => {
            res.json({
                data: success,
                msg: "Product Deleted Successfully.",
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

    getProductById = (req,res,next) => {
        ProductModel.findById(
            {
                _id: req.params.id
            }
        )
        .then((success) => {
            res.json({
                data: JSON.stringify(success),
                msg: "Product Lists.",
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

module.exports = ProductController;