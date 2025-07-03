const mongoose = require('mongoose');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    thumbnail: {
        type: String,
        required: true,
        default: '',
    },
    priceBase: {
        type: Number,
        default: 0,
    },
    priceOptions: {
        type: Object,
        default: {
            color: {},
            memory: {},
            ram: {},
        },
        min: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    generalSpecifications: {
        type: Object,
        default: {},
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isNew: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true});

productSchema.pre('save', async function (next) {
    await generateUniqueSlug("title", "slug").call(this);

    if (this.isNew) {
        this.isNew = true;
    } else {
        const createdAt = this.createdAt || new Date();
        const diffDays = Math.floor((new Date() - createdAt) / (1000 * 60 * 60 * 24));
        this.isNew = diffDays <= 3;
    }

    next();
});


const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;