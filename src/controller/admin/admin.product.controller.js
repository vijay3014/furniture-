const ProductServices = require('../../services/product.service');
const productService = new ProductServices();

exports.addProduct = async (req, res) => {
    try {
        let product = await productService.getProduct(req.body.productName, { isDelete: false });
        // console.log("Old Product is => ",product);
        if (product) {
            return res.json({ message: "Product is already exist.Please try again" });
        };
        if (req.file) {
            // console.log("REQ.FILE is here => ",req.file);
            req.body.productImage = req.file.path.replace('\\', '/');
        };
        // console.log("REQ>BODY is here => ",{...req.body});
        let newProduct = await productService.addNewProduct({ ...req.body });
        return res.json({ newProduct, message: "Product Succesfully Added" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let Product = await productService.getAllProduct({ isDelete: false });
        if (!Product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        // console.log(Product);
        // let showProduct = {
        //     Name: Product.productName,
        //     Image: Product.productImage,
        //     Price: Product.productPrice
        // }
        // console.log(showProduct);
        return res.json({ Products: Product });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.getSpeProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        // console.log(req.body.ProductID);
        // console.log(Product);
        if (!Product) {
            return res.json({ message: "Product is not found.. Please try again" });
        };
        return res.json({ Product });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        // console.log(req.body.ProductID);
        if (!Product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        if (req.file) {
            // console.log("REQ.FILE is here => ",req.file);
            req.body.productImage = req.file.path.replace('\\', '/');
        };
        Product = await productService.updateProduct(req.body.ProductID, { ...req.body }, { new: true });
        return res.json({ Product, message: "Product was updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        if (!Product) {
            return res.json({ message: "Product is not found..Please try again" });
        };
        Product = await productService.updateProduct(req.body.ProductID, { isDelete: true }, { new: true });
        return res.json({ message: "Product was deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error from product controller" });
    };
};