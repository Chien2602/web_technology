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
const {checkToken, checkPermissions} = require('../middlewares/auth.middleware');

router.get('/', checkToken, checkPermissions(["role:read"]), getAllRoles);
router.get('/:id', checkToken, checkPermissions(["role:read"]), getRoleById);
router.post('/', checkToken, checkPermissions(["role:create"]), createRole);
router.put('/:id', checkToken, checkPermissions(["role:update"]), updateRole);
router.patch('/soft-delete/:id', checkToken, checkPermissions(["role:update"]), softDeleteRole);
router.delete('/hard-delete/:id', checkToken, checkPermissions(["role:delete"]), hardDeleteRole);

module.exports = router;
