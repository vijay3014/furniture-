const express = require('express');
const Order = express.Router();
const { createOrder, getOrder, getAllOrder, deleteOrder, getOrderById } = require('../../controller/user/user.order.controller');
const { userVerifyToken } = require('../../helpers/userToken/userVerifytoken');

Order.post('/add-Order',userVerifyToken,createOrder);
Order.get('/get-Order',userVerifyToken,getOrder);
Order.get('/getOrder',userVerifyToken,getOrderById);
Order.get('/get-All-Order',getAllOrder);
Order.delete('/delete-Order',userVerifyToken,deleteOrder);

module.exports = Order;