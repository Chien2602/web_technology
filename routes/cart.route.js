const express = require("express");
const router = express.Router();
const {
    getCartByUserId,
    createCart,
    updateCart,
    deleteAllProductsFromCart,
    addProductToCart,
} = require("../controllers/cart.controller");

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Quản lý giỏ hàng
 */
/**
 * @swagger
 * /carts/{userId}:
 *   get:
 *     summary: Lấy giỏ hàng theo ID người dùng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Tìm thấy giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Không tìm thấy giỏ hàng
 */
router.get("/:userId", getCartByUserId);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Tạo mới giỏ hàng
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartInput'
 *     responses:
 *       201:
 *         description: Tạo giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 */
router.post("/", createCart);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Cập nhật giỏ hàng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CartProduct'
 *     responses:
 *       200:
 *         description: Cập nhật giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 *       404:
 *         description: Không tìm thấy giỏ hàng
 */
router.put("/:id", updateCart);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Xóa tất cả sản phẩm khỏi giỏ hàng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID giỏ hàng
 *     responses:
 *       200:
 *         description: Đã xóa tất cả sản phẩm khỏi giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Không tìm thấy giỏ hàng
 */
router.delete("/:id", deleteAllProductsFromCart);

/**
 * @swagger
 * /carts/{id}/add-product:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Đã thêm sản phẩm vào giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 *       404:
 *         description: Không tìm thấy giỏ hàng
 */
router.post("/:id/add-product", addProductToCart);

module.exports = router;
