const express = require('express');
const { uploadImage, deleteImage, handleUpload } = require('../controllers/cloudinary.controller');
const router = express.Router();
const {checkToken, checkPermissions} = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Cloudinary
 *   description: Quản lý hình ảnh Cloudinary
 */

/**
 * @swagger
 * /cloudinary/upload:
 *   post:
 *     summary: Tải ảnh lên Cloudinary
 *     tags: [Cloudinary]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: File ảnh cần tải lên
 *     responses:
 *       200:
 *         description: Tải ảnh lên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tải ảnh lên thành công
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
 *       400:
 *         description: Không có file được tải lên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không có file được tải lên
 */
router.post('/upload', uploadImage, handleUpload);
/**
 * @swagger
 * /cloudinary/delete/{publicId}:
 *   delete:
 *     summary: Xóa ảnh khỏi Cloudinary
 *     tags: [Cloudinary]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         schema:
 *           type: string
 *         required: true
 *         description: Public ID của ảnh cần xóa
 *     responses:
 *       200:
 *         description: Xóa ảnh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Xóa ảnh thành công
 *                 result:
 *                   type: object
 *                   description: Kết quả trả về từ Cloudinary
 *       500:
 *         description: Lỗi khi xóa ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lỗi khi xóa ảnh
 *                 error:
 *                   type: object
 *                   description: Chi tiết lỗi
 */
router.delete('/delete/:publicId', checkToken, checkPermissions(["cloudinary:delete"]), deleteImage);

module.exports = router;
