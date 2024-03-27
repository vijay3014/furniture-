const express = require('express');
const userProduct = express.Router();
const { getAllProduct, getSpeProduct } = require('../../controller/user/user.product.controller');

userProduct.get('/getAllProduct',getAllProduct);
userProduct.get('/getProduct',getSpeProduct);

module.exports = userProduct;