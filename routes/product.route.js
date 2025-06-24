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
const { checkToken, checkPermissions } = require("../middlewares/auth.middleware");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", checkToken, checkPermissions(["product:create"]), createProduct);
router.put("/:id", checkToken, checkPermissions(["product:update"]), updateProduct);
router.patch("/soft-delete/:id", checkToken, checkPermissions(["product:update"]), softDeleteProduct);
router.delete("/hard-delete/:id", checkToken, checkPermissions(["product:delete"]), hardDeleteProduct);

module.exports = router;