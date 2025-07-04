const express = require("express");
const passport = require("passport");
const {
    register,
    login,
    verifyCode,
    resendVerificationCode,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    refreshToken,
} = require("../controllers/auth.controller.js");
const { googleStrategy } = require("../controllers/passport.controller.js");
const { checkToken } = require("../middlewares/auth.middleware.js");

const router = express.Router();

/**
 * @swagger
 * tags: 
 * - name: Auth
 *   description: Quản lý xác thực người dùng
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đầu vào
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai thông tin đăng nhập
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: Xác thực mã OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: Xác thực thành công
 *       400:
 *         description: Mã xác thực không hợp lệ
 */
router.post("/verify-code", verifyCode);

/**
 * @swagger
 * /auth/resend-verification-code:
 *   post:
 *     summary: Gửi lại mã xác thực
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Gửi lại mã thành công
 */
router.post("/resend-verification-code", resendVerificationCode);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Quên mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Đã gửi email đặt lại mật khẩu
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Đặt lại mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Đổi mật khẩu
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 */
router.post("/change-password", checkToken, changePassword);

/**
 * @swagger
 * /auth/update-profile/{slug}:
 *   patch:
 *     summary: Cập nhật thông tin cá nhân
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug của user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.patch("/update-profile/:slug", checkToken, updateProfile);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Làm mới token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Làm mới token thành công
 */
router.post("/refresh-token", refreshToken);

// Google OAuth routes (not documented in Swagger)
passport.use("google", googleStrategy);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login"
}), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login successfully",
        data: req.user,
    });
});

module.exports = router;
