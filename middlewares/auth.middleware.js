const jwt = require("jsonwebtoken");
const Role = require("../models/role.model");

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const checkPermissions = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.roleId;

      const role = await Role.findById(userRole);
      if (!role) {
        return res.status(403).json({ message: "Forbidden: Role not found" });
      }

      // Giả sử `role.permissions` là mảng các quyền
      const hasPermission = requiredPermissions.every((perm) =>
        role.permissions.includes(perm)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Permission check error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = { checkToken, checkPermissions };