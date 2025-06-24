const Category = require('../models/category.model');
const getPagination = require('../utils/pagination');

const getAllCategories = async (req, res) => {
    try {
        const pagination = await getPagination(req, {isDeleted: false}, 'Category');
        const categories = await Category
            .find({isDeleted: false})
            .populate('createdBy', 'fullname username email')
            .populate('updatedBy', 'fullname username email')
            .skip(pagination.skip)
            .limit(pagination.limitItems)
            .sort({createdAt: -1});
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category
            .findById(categoryId)
            .populate('createdBy')
            .populate('updatedBy');
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getCategoryBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const category = await Category
            .findOne({slug})
            .populate('createdBy')
            .populate('updatedBy');
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const createCategory = async (req, res) => {
    try {
        const {title, description, thumbnail} = req.body;

        if (!title) {
            return res.status(400).json({message: 'title is required'});
        }

        const newCategory = new Category({
            title,
            description,
            thumbnail,
            createdBy: req.user._id,
        });

        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const {title, description, thumbnail, isActive} = req.body;

        if (!title) {
            return res.status(400).json({message: 'title is required'});
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        category.title = title || category.title;
        category.description = description || category.description;
        category.thumbnail = thumbnail || category.thumbnail;
        category.isActive = isActive !== undefined ? isActive : category.isActive;
        category.updatedBy = req.user._id;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const softDeleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        category.isDeleted = true;
        category.updatedBy = req.user._id;
        await category.save();
        res.status(200).json({message: 'Category soft deleted successfully'});
    } catch (error) {
        console.error('Error soft deleting category:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const hardDeleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json({message: 'Category deleted successfully'});
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    softDeleteCategory,
    hardDeleteCategory
};