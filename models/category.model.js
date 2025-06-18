const mongoose = require('mongoose');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    thumbnail: {
        type: String,
        default: '',
    },
    slug: {
        type: String,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

categorySchema.pre('save', generateUniqueSlug(Category, 'title', 'slug'));

const Category = mongoose.model('Category', categorySchema, 'categories');
module.exports = Category;