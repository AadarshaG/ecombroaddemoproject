 const mongoose = require('mongoose');

 const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    is_parent: Boolean,
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    image: String
 },{
    timestamps: true
 });

 const Category = mongoose.model('Category', CategorySchema);

 module.exports = Category;