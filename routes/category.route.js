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
const {categoryValidation} = require('../validates/validates');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', checkToken, checkPermissions(["category:create"]), categoryValidation, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.put('/:id', checkToken, checkPermissions(["category:update"]), updateCategory);

/**
 * @swagger
 * /categories/{id}/soft-delete:
 *   patch:
 *     summary: Soft delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category soft deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.patch('/:id/soft-delete', checkToken, checkPermissions(["category:update"]), softDeleteCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Hard delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.delete('/:id', checkToken, checkPermissions(["category:delete"]), hardDeleteCategory);

module.exports = router;
