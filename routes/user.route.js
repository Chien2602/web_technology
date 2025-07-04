const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    getUserBySlug,
    createUser,
    updateUser,
    softDeleteUser,
    hardDeleteUser,
} = require("../controllers/user.controller");
const {checkToken, checkPermissions} = require("../middlewares/auth.middleware");
const {userValidation} = require('../validates/validates');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy tất cả người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", checkToken, checkPermissions(["user:read"]), getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Lấy người dùng theo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Đã tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get("/:userId", checkToken, checkPermissions(["user:read"]), getUserById);

/**
 * @swagger
 * /users/slug/{slug}:
 *   get:
 *     summary: Lấy người dùng theo slug
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug người dùng
 *     responses:
 *       200:
 *         description: Đã tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get("/slug/:slug", checkToken, checkPermissions(["user:read"]), getUserBySlug);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tạo mới người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 */
router.post("/", checkToken, checkPermissions(["user:create"]), userValidation, createUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Cập nhật người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Cập nhật người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Lỗi xác thực dữ liệu
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put("/:userId", checkToken, checkPermissions(["user:update"]), updateUser);

/**
 * @swagger
 * /users/soft-delete/{userId}:
 *   patch:
 *     summary: Xóa mềm người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Đã xóa mềm người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.patch("/soft-delete/:userId", checkToken, checkPermissions(["user:update"]), softDeleteUser);

/**
 * @swagger
 * /users/hard-delete/{userId}:
 *   delete:
 *     summary: Xóa cứng người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Đã xóa cứng người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete("/hard-delete/:userId", checkToken, checkPermissions(["user:delete"]), hardDeleteUser);

module.exports = router;
