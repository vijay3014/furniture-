const ProductServices = require('../../services/product.service');
const productService = new ProductServices();

exports.getAllProduct = async(req,res)=>{
    try {
        let Product = await productService.getAllProduct({isDelete : false});
        console.log(Product);
        if (!Product) {
            return res.json({message: "Product is not found.."});
        };
        return res.json({Product});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from product user controller"});
    }
};

exports.getSpeProduct = async(req,res)=>{
    try {
        let Product = await productService.getProductById(req.query.ProductID);
        console.log(req.body.ProductID);
        console.log(Product);
        if (!Product) {
            return res.json({message: "Product is not found.."});
        };
        return res.json({Product});
    } catch (error) {
        console.log(error);
        return res.json({message: "Server Error from product user controller"});
    }
};