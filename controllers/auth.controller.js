const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const { sendEmail, transporter } = require("../configs/email.config");
const {
  generateVerificationEmail,
  generateForgotPasswordEmail,
} = require("../utils/emailTemplates");

const {
  generateToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    if (!fullname || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email } || { username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      createdBy: req.userId || null,
      updatedBy: req.userId || null,
    });
    await newUser.save();
    const payload = {
      userId: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
    };
    const token = generateToken(payload);
    const codeVerify = Math.floor(100000 + Math.random() * 900000);
    newUser.codeVerify = codeVerify;

    const { subject, text, html } = generateVerificationEmail({
      fullname: newUser.fullname,
      code: codeVerify,
    });

    await sendEmail(newUser.email, subject, text, html);

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if ((!email && !username) || !password) {
      return res
        .status(400)
        .json({ message: "Email or username and password are required" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = {
      userId: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

   if (user.verifyEmail === false) {
     return res.status(403).json({
       message: "Email not verified. Please verify your email to log in.",
     });
   }


    res.status(200).json({
      message: "Login successful",
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, codeVerify } = req.body;
    if (!email || !codeVerify) {
      return res
        .status(400)
        .json({ message: "Email and verification code are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      user.codeVerify !== codeVerify ||
      Date.now() - new Date(user.timeSendCode).getTime() > 5 * 60 * 1000
    ) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }
    user.verifyEmail = true;
    user.codeVerify = "";
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const codeVerify = Math.floor(100000 + Math.random() * 900000);
    user.codeVerify = codeVerify;
    user.timeSendCode = Date.now();
    await user.save();
    const { subject, text, html } = generateVerificationEmail({
      fullname: user.fullname,
      code: codeVerify,
    });
    await sendEmail(user.email, subject, text, html);
    res.status(200).json({ message: "Verification code resent successfully" });
  } catch (error) {
    console.error("Error during resend verification code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const codeVerify = Math.floor(100000 + Math.random() * 900000);
    user.codeVerify = codeVerify;
    user.timeSendCode = Date.now();
    await user.save();
    const { subject, text, html } = generateForgotPasswordEmail({
      fullname: user.fullname,
      code: codeVerify,
    });
    sendEmail(user.email, subject, text, html);
    res.status(200).json({ message: "Verification code sent to email" });
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, codeVerify, newPassword } = req.body;
    if (!email || !codeVerify || !newPassword) {
      return res
        .status(400)
        .json({
          message: "Email, verification code, and new password are required",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      user.codeVerify !== codeVerify ||
      Date.now() - user.timeSendCode.getTime() > 5 * 60 * 1000
    ) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.codeVerify = "";
    user.timeSendCode = null;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({
          message: "User ID, old password, and new password are required",
        });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error during password change:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    const { fullname, username, email, phone, address } = req.body;
    const user = await User.findOne({ slug });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const payload = {
      userId: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    };
    const newToken = generateToken(payload);
    res.status(200).json({ token: newToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  verifyCode,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  refreshToken,
};
