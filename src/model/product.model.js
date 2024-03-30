const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type : String,
        unique : true,
        required : true
    },
    // productImage: {
    //     type : String,
    //     required : true
    // },
    productPrice: {
        type: Number,
        required : true
    },
    productBrand: {
        type : String
    },
    description: {
        type : String
    },
    category: [{
        type : String
    }],
    isDelete: {
        type : Boolean,
        default : false
    }
},{
    versionKey : false,
    timestamps : true
});

module.exports = mongoose.model('products',productSchema);