const express = require("express");
const router = express.Router();
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
} = require("../controllers/auth.controller");
const { googleStrategy } = require("../controllers/passport.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-code", verifyCode);
router.post("/resend-verification-code", resendVerificationCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", changePassword);
router.patch("/update-profile", updateProfile);
router.post("/refresh-token", refreshToken);

passport.use("google", googleStrategy);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login successfully",
        data: req.user,
    });
});

module.exports = router;
