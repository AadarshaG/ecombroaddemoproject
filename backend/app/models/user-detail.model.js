const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    lastname:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const UserDetail = mongoose.model('UserDetail',UserDetailSchema);

module.exports = UserDetail;