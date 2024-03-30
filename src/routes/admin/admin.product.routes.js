const express = require('express');
const adminProduct = express.Router();
const { upload } = require('../../helpers/ImageUpload');
const { addProduct, getAllProduct, getSpeProduct, updateProduct, deleteProduct } = require('../../controller/admin/admin.product.controller');

// adminProduct.post('/addNewProduct',upload.single('productImage'),addProduct);
adminProduct.post('/addNewProduct',addProduct);
adminProduct.get('/getAllProduct',getAllProduct);
adminProduct.get('/getProduct',getSpeProduct);
// adminProduct.put('/updateProduct',upload.single('productImage'),updateProduct);
adminProduct.put('/updateProduct',updateProduct);
adminProduct.delete('/deleteProduct',deleteProduct);

module.exports = adminProduct;