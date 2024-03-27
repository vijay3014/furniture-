const express = require('express');
const Favorite = express.Router();
const { upload } = require('../../helpers/ImageUpload');
const { addToFavorite, getAllFavorite, deleteFavorite } = require('../../controller/user/user.favorite.controller');
const { userVerifyToken } = require('../../helpers/userToken/userVerifytoken');

Favorite.post('/add-Favorite',upload.none(),userVerifyToken,addToFavorite);
Favorite.get('/get-Favorite',userVerifyToken,getAllFavorite);
Favorite.delete('/delete-Favorite',upload.none(),userVerifyToken,deleteFavorite);

module.exports = Favorite;