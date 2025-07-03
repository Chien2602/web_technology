const express = require('express');
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    softDeleteCategory,
    hardDeleteCategory
} = require('../controllers/category.controller');
const router = express.Router();
const {checkToken, checkPermissions} = require('../middlewares/auth.middleware');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', checkToken, checkPermissions(["category:create"]), createCategory);
router.put('/:id', checkToken, checkPermissions(["category:update"]), updateCategory);
router.patch('/:id/soft-delete', checkToken, checkPermissions(["category:update"]), softDeleteCategory);
router.delete('/:id', checkToken, checkPermissions(["category:delete"]), hardDeleteCategory);

module.exports = router;
