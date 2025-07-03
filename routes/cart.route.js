const express = require("express");
const router = express.Router();
const {
    getCartByUserId,
    createCart,
    updateCart,
    deleteAllProductsFromCart,
    addProductToCart,
} = require("../controllers/cart.controller");

router.get("/:userId", getCartByUserId);
router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteAllProductsFromCart);
router.post("/:id/add-product", addProductToCart);

module.exports = router;
