const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } =
            req.body;
        // console.log("req.body", req.body);
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res
                .status(200)
                .json({ status: "ERR", message: "The input is required." });
        }

        const product = await ProductService.createProduct(req.body);
        return res.status(200).json(product);
    } catch (e) {
        return res.status(404).json({
            message: "Product creation failed",
            error: e.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required",
            });
        }
        // console.log("productId", productId);
        const user = await ProductService.updateProduct(productId, data);

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "! User creation failed !",
            error: e.message,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required",
            });
        }
        const product = await ProductService.getDetailsProduct(productId);

        return res.status(200).json(product);
    } catch (e) {
        return res.status(404).json({
            message: "! User creation failed 'SOS'!",
            error: e.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required",
            });
        }
        const user = await ProductService.deleteProduct(productId);

        return res.status(200).json(user);
    } catch (e) {
        return res.status(404).json({
            message: "! Delete Product failed !",
            error: e.message,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        console.log("req.query", req.query);
        const product = await ProductService.getAllProduct(
            Number(limit) || 8,
            Number(page) || 0,
            sort,
            filter
        );
        return res.status(200).json(product);
    } catch (e) {
        return res.status(404).json({
            error: e.message,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
};
