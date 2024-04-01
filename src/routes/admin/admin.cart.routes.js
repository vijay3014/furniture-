const express = require('express');
const cartAdmin = express.Router();
const {} = require('../../helpers/adminToken/adminVerifytoken');
const { getAllCart } = require('../../controller/admin/admin.cart.controller');

cartAdmin.get('/getAllCart',getAllCart);

module.exports = cartAdmin;