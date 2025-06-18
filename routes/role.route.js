const express = require('express');
const router = express.Router();
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  softDeleteRole,
  hardDeleteRole,
} = require('../controllers/role.controller');

router.get('/', getAllRoles);
router.get('/:id', getRoleById);
router.post('/', createRole);
router.put('/:id', updateRole);
router.patch('/soft-delete/:id', softDeleteRole);
router.delete('/hard-delete/:id', hardDeleteRole);

module.exports = router;