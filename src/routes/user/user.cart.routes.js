const express = require('express');
const Cart = express.Router();
const { userVerifyToken } = require('../../helpers/userToken/userVerifytoken');
const { addToCart, getCart, updateCart, deleteCart } = require('../../controller/user/user.cart.controller');

Cart.post('/addCart',userVerifyToken,addToCart);
Cart.get('/get-Cart',userVerifyToken,getCart);
Cart.put('/update-Cart',userVerifyToken,updateCart);
Cart.delete('/delete-Cart',userVerifyToken,deleteCart);

module.exports = Cart;