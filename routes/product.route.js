const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
  hardDeleteProduct,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/soft-delete/:id", softDeleteProduct);
router.delete("/hard-delete/:id", hardDeleteProduct);

module.exports = router;