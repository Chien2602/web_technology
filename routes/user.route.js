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

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.get("/slug/:slug", getUserBySlug);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.patch("/soft-delete/:userId", softDeleteUser);
router.delete("/hard-delete/:userId", hardDeleteUser);

module.exports = router;
