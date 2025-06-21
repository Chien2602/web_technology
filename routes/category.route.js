const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, softDeleteCategory, hardDeleteCategory } = require('../controllers/category.controller');
const router = express.Router();
const { checkToken } = require('../middlewares/auth.middleware');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', checkToken, createCategory);
router.put('/:id', checkToken, updateCategory);
router.patch('/:id/soft-delete', checkToken, softDeleteCategory);
router.delete('/:id', checkToken, hardDeleteCategory);

module.exports = router;