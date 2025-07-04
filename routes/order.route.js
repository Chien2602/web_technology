const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createOrder,
    softDeleteOrder,
    hardDeleteOrder,
} = require('../controllers/order.controller');
const {checkToken, checkPermissions} = require('../middlewares/auth.middleware');
const {orderValidation} = require('../validates/validates');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Quản lý đơn hàng
 */
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lấy tất cả đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', checkToken, checkPermissions(["order:read"]), getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Lấy đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đơn hàng
 *     responses:
 *       200:
 *         description: Đã tìm thấy đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.get('/:id', getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Tạo mới đơn hàng
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Tạo đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 */
router.post('/', checkToken, checkPermissions(["order:create"]), orderValidation, createOrder);

/**
 * @swagger
 * /orders/soft-delete/{id}:
 *   patch:
 *     summary: Xóa mềm đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đơn hàng
 *     responses:
 *       200:
 *         description: Đã xóa mềm đơn hàng
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.patch('/soft-delete/:id', checkToken, checkPermissions(["order:update"]), softDeleteOrder);

/**
 * @swagger
 * /orders/hard-delete/{id}:
 *   delete:
 *     summary: Xóa cứng đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đơn hàng
 *     responses:
 *       200:
 *         description: Đã xóa cứng đơn hàng
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.delete('/hard-delete/:id', checkToken, checkPermissions(["order:delete"]), hardDeleteOrder);

module.exports = router;
