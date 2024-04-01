const express = require('express');
const Order = express.Router();
const { createOrder, getOrder, getAllOrder, deleteOrder, getOrderById } = require('../../controller/user/user.order.controller');
const { userVerifyToken } = require('../../helpers/userToken/userVerifytoken');

Order.post('/addOrder',userVerifyToken,createOrder);
Order.get('/getOrder',userVerifyToken,getOrder);
Order.get('/getOrder',userVerifyToken,getOrderById);
Order.get('/getAllOrder',getAllOrder);
Order.delete('/deleteOrder',userVerifyToken,deleteOrder);

module.exports = Order;