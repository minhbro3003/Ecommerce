const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const {
    authMiddleware,
    authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", productController.createProduct);
router.put(
    "/update-product/:id",
    authMiddleware,
    productController.updateProduct
);
router.get("/get-details/:id", productController.getDetailsProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get("/get-all-product", productController.getAllProduct);

module.exports = router;
