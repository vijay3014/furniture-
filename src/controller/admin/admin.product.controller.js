const ProductServices = require('../../services/product.service');
const productService = new ProductServices();

exports.addProduct = async (req, res) => {
    try {
        // let product = await productService.getProduct(req.body.productName, { isDelete: false });
        let product = await productService.getProduct({title: req.body.title, isDelete: false });
        if (product) {
            return res.json({ message: "Product is already exist.." });
        };
        if (req.file) {
            // console.log("REQ.FILE is here => ",req.file);
            // req.body.productImage = req.file.path.replace('\\', '/');
        };
        // console.log("REQ>BODY is here => ",{...req.body});
        let newProduct = await productService.addNewProduct({ ...req.body });
        return res.json({ newProduct, message: "Product Succesfully Added" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let Product = await productService.getAllProduct({ isDelete: false });
        if (!Product) {
            return res.json({ message: "Product is not found.." });
        };
        return res.json({ Products: Product });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.getSpeProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.body.ProductID);
        console.log(req.body.ProductID);
        console.log(Product);
        if (!Product) {
            return res.json({ message: "Product is not found.." });
        };
        return res.json({ Product });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.query.ProductID);
        // console.log(req.body.ProductID);
        if (!Product) {
            return res.json({ message: "Product is not found.." });
        };
        if (req.file) {
            // console.log("REQ.FILE is here => ",req.file);
            // req.body.productImage = req.file.path.replace('\\', '/');
        };
        Product = await productService.updateProduct(Product._id, { ...req.body }, { new: true });
        res.json({ Product, message: "Product was updated succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let Product = await productService.getProductById(req.query.ProductID);
        if (!Product) {
            return res.json({ message: "Product is not found.." });
        };
        Product = await productService.updateProduct(Product._id, { isDelete: true }, { new: true });
        res.json({ message: "Product was deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "something went wrong" });
    };
};