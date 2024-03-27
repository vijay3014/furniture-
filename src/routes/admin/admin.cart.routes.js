const express = require('express');
const cartAdmin = express.Router();
const {} = require('../../helpers/adminToken/adminVerifytoken');
const { getAllCart } = require('../../controller/admin/admin.cart.controller');

cartAdmin.get('/get-Cart',getAllCart);

module.exports = cartAdmin;