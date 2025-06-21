const mongoose = require("mongoose");
const generateUniqueSlug = require("../utils/generateUniqueSlug");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
        default: "",
    },
    slug: {
        type: String,
        unique: true,
    },
    refreshToken: {
        type: String,
        default: "",
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    },
    codeVerify: {
        type: String,
        default: "",
    },
    timeSendCode: {
        type: Date,
        default: Date.now,
    },
    verifyEmail: {
        type: Boolean,
        default: false,
    },
    isStatus: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

userSchema.pre("save", generateUniqueSlug("fullname", "slug"));

const User = mongoose.model("User", userSchema, "users");
module.exports = User;