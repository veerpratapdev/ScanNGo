const express = require("express");

const {
    createProduct,
    getProducts,
    getProductByBarcode,
    getProductById,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Product route working" });
});

router.get("/barcode/:barcode", getProductByBarcode);
router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;