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
const {checkToken, checkPermissions} = require("../middlewares/auth.middleware");
const { productValidation } = require("../validates/validates");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lấy tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Lấy sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Đã tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Tạo mới sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 */
router.post("/", checkToken, checkPermissions(["product:create"]), productValidation, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.put("/:id", checkToken, checkPermissions(["product:update"]), productValidation, updateProduct);

/**
 * @swagger
 * /products/soft-delete/{id}:
 *   patch:
 *     summary: Xóa mềm sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Đã xóa mềm sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.patch("/soft-delete/:id", checkToken, checkPermissions(["product:update"]), softDeleteProduct);

/**
 * @swagger
 * /products/hard-delete/{id}:
 *   delete:
 *     summary: Xóa cứng sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Đã xóa cứng sản phẩm
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.delete("/hard-delete/:id", checkToken, checkPermissions(["product:delete"]), hardDeleteProduct);

module.exports = router;