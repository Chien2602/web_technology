const Role = require("../models/role.model");
const getPagination = require("../utils/pagination");

const getAllRoles = async (req, res) => {
  try {
    const pagination = await getPagination(
      req,
      {
        isActive: true,
      },
      "Role"
    );
    const roles = await Role.find({
      isActive: true,
    })
      .populate("createdBy", "fullname username email")
      .populate("updatedBy", "fullname username email")
      .skip(pagination.skip)
      .limit(pagination.limitItems)
      .sort({
        createdAt: -1,
      });
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId)
      .populate("createdBy", "fullname username email")
      .populate("updatedBy", "fullname username email");
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createRole = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    let { permissions } = req.body
    if (!title) {
      return res.status(400).json({
        message: "Role name is required",
      });
    }
    if (permissions === "*") {
      permissions = [
        "user:read",
        "user:create",
        "user:update",
        "user:delete",
        "category:read",
        "category:create",
        "category:update",
        "category:delete",
        "product:read",
        "product:create",
        "product:update",
        "product:delete",
        "order:read",
        "order:create",
        "order:update",
        "order:delete",
        "role:read",
        "role:create",
        "role:update",
        "role:delete",
      ];
    }

    const newRole = new Role({
      title,
      description,
      permissions,
      createdBy: createdBy,
    });

    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const { name, description, permissions } = req.body;

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    role.name = name || role.name;
    role.description = description || role.description;
    role.permissions = permissions || role.permissions;
    role.updatedBy = req.user._id;

    await role.save();
    res.status(200).json(role);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const softDeleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    role.isActive = false;
    role.updatedBy = req.user._id;
    await role.save();
    res.status(200).json({
      message: "Role soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting role:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const hardDeleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    await role.remove();
    res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  softDeleteRole,
  hardDeleteRole,
};
