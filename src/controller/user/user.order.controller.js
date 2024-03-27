const OrderServices = require('../../services/order.service');
const orderService = new OrderServices();
const CartServices = require('../../services/cart.service');
const cartService = new CartServices();

exports.createOrder = async (req,res)=>{
    try {
        let cart = await cartService.getAllCart(req.query,req.user);
        // console.log(cart);
        if (!cart) {
            return res.json({message: "Cart is not found..Please try again"});
        };
        let orderItem = cart.map((item)=>({
            cartItem: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.productPrice
        }));
        // console.log(orderItem);
        let totalPrice = orderItem.reduce((total,item)=>(total+= (item.quantity * item.price)),0);
        // console.log(totalPrice);
        let newOrder = {
            user: req.user._id,
            items: orderItem,
            totalAmount:totalPrice 
        };
        // console.log(newOrder);
        let order = await orderService.addToOrder(newOrder);
        await cartService.updatemanyCart(req.user._id,{isDelete: true});
        return res.json({order, message: "Order Succesfully Done"});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from order user controller"});
    }
};

exports.getOrder = async (req,res)=>{
    try {
        let order = await orderService.getOrder(req.body.orderID,{isDelete: false});
        if (!order) {
            return res.json({message: "Order is not found from this USER"});
        };
        return res.json({order});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from order user controller"});
    };
};

exports.getOrderById = async (req,res)=>{
    try {
        let order = await orderService.getOrderById(req.body.orderID);
        // console.log(order);
        if (!order) {
            return res.json({message: "Order is not found from this USER"});
        };
        return res.json({order});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from order user controller"});
    };
};

exports.getAllOrder = async (req,res)=>{
    try {
        let order = await orderService.getAllOrder({isDelete: false});
        if (!order) {
            return res.json({message: "Order is not found..Please try again"});
        };
        return res.json({Orders: order});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from order user controller"});
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        let order = await orderService.updateOrder(req.body.orderID, { isDelete: true });
        console.log(order);
        if (!order) {
            return res.json({ message: "Order is not found..." });
        };
        return res.json({ order, message: "Order is Deleted Sucessfuly" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error From DeleteOrder Controller" });
    }
};