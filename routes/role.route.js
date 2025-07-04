const express = require('express');
const router = express.Router();
const {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    softDeleteRole,
    hardDeleteRole,
} = require('../controllers/role.controller');
const {checkToken, checkPermissions} = require('../middlewares/auth.middleware');
const {roleValidation} = require('../validates/validates');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Quản lý vai trò và phân quyền
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lấy tất cả vai trò
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách vai trò
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get('/', checkToken, checkPermissions(["role:read"]), getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Lấy vai trò theo ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID vai trò
 *     responses:
 *       200:
 *         description: Dữ liệu vai trò
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.get('/:id', checkToken, checkPermissions(["role:read"]), getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Tạo mới vai trò
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Tạo vai trò thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Yêu cầu không hợp lệ
 */
router.post('/', checkToken, checkPermissions(["role:create"]), roleValidation, createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Cập nhật vai trò
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID vai trò
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Cập nhật vai trò thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.put('/:id', checkToken, checkPermissions(["role:update"]), updateRole);

/**
 * @swagger
 * /roles/soft-delete/{id}:
 *   patch:
 *     summary: Xóa mềm vai trò
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID vai trò
 *     responses:
 *       200:
 *         description: Đã xóa mềm vai trò
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.patch('/soft-delete/:id', checkToken, checkPermissions(["role:update"]), softDeleteRole);

/**
 * @swagger
 * /roles/hard-delete/{id}:
 *   delete:
 *     summary: Xóa cứng vai trò
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID vai trò
 *     responses:
 *       200:
 *         description: Đã xóa cứng vai trò
 *       404:
 *         description: Không tìm thấy vai trò
 */
router.delete('/hard-delete/:id', checkToken, checkPermissions(["role:delete"]), hardDeleteRole);

module.exports = router;
