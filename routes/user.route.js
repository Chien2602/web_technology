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
const { checkToken, checkPermissions } = require("../middlewares/auth.middleware");

router.get("/", checkToken, checkPermissions(["user:read"]), getAllUsers);
router.get("/:userId", checkToken, checkPermissions(["user:read"]), getUserById);
router.get("/slug/:slug", checkToken, checkPermissions(["user:read"]), getUserBySlug);
router.post("/", checkToken, checkPermissions(["user:create"]), createUser);
router.put("/:userId", checkToken, checkPermissions(["user:update"]), updateUser);
router.patch("/soft-delete/:userId", checkToken, checkPermissions(["user:update"]), softDeleteUser);
router.delete("/hard-delete/:userId", checkToken, checkPermissions(["user:delete"]), hardDeleteUser);

module.exports = router;
