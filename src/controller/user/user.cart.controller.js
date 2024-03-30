const CartService = require('../../services/cart.service');
const cartServices = new CartService();

exports.addToCart = async (req,res)=>{
    try {
        let cart = await cartServices.getCart({cartItem: req.body.cartItem, user: req.user._id,isDelete: false});
        console.log(cart);
        if (cart) {
            return res.json({message: "Cart Item already exist..."});
        };
        cart = await cartServices.addToCart({
            ...req.body, user: req.user._id, cartItem: req.body.cartItem
        });
        return res.json({cart, message: "New Item is added to the cart"});
    } catch (error) {
        console.log(error);
        return res.json({message: "something went wrong"});
    }
};

exports.getCart = async(req,res)=>{
    try {
        let cart = await cartServices.getAllCart({user: req.user._id,isDelete: false});
        console.log(cart);
        if (!cart) {
            return res.json({message: "Cart Item is not found.."});
        };
        return res.json({Cart: cart});
    } catch (error) {
        console.log(error);
        return res.json({message: "something went wrong"});
    }
};

exports.updateCart = async(req,res)=>{
    try {
        let cart = await cartServices.getCart({user: req.user._id, isDelete: false});
        console.log(cart);
        if (!cart) {
            return res.json({message: "Cart Item is not found.."});
        };
        cart = await cartServices.updateCart(cart._id,req.body,{new: true});
        return res.json({cart, message: "Cart is updated succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({message: "something went wrong"});
    }
};

exports.deleteCart = async(req,res)=>{
    try {
        let cart = await cartServices.getCart({user: req.user._id,isDelete: false});
        if (!cart) {
            return res.json({message: "Cart is not found..Please try again"});
        };
        cart = await cartServices.updateCart(cart._id,{isDelete: true},{new: true});
        return res.json({cart,message: "Cart is deleted succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({message: "something went wrong"});
    }
};