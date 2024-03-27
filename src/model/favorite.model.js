const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    favoriteItem: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true,
    versionKey : false
});

module.exports = mongoose.model('favorites',favoriteSchema);