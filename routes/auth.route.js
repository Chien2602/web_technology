const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyCode,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  refreshToken,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-code", verifyCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.patch("/update-profile", updateProfile);
router.post("/refresh-token", refreshToken);

module.exports = router;
