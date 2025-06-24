const Product = require('../models/product.model');
const getPagination = require('../utils/pagination');

const getAllProducts = async (req, res) => {
    try {
        const pagination = await getPagination(req, {isDeleted: false}, 'Product');
        const products = await Product.find({isDeleted: false})
            .populate('categoryId', 'title slug')
            .populate('createdBy', 'fullname username email')
            .skip(pagination.skip)
            .limit(pagination.limitItems)
            .sort({createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
            .populate('createdBy');
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({slug})
            .populate('createdBy');
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const createProduct = async (req, res) => {
    try {
        const {title, description, categoryId, priceBase, priceOptions, discount, generalSpecifications} = req.body;

        if (!title || !categoryId || priceBase === undefined) {
            return res.status(400).json({message: 'Title, categoryId, and priceBase are required'});
        }
        const newProduct = new Product({
            title,
            description,
            categoryId,
            priceBase,
            priceOptions,
            discount,
            generalSpecifications,
            createdBy: req.user._id,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {title, description, categoryId, priceBase, priceOptions, discount, generalSpecifications} = req.body;

        if (!title || !categoryId || priceBase === undefined) {
            return res.status(400).json({message: 'Title, categoryId, and priceBase are required'});
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        product.title = title || product.title;
        product.description = description || product.description;
        product.categoryId = categoryId || product.categoryId;
        product.priceBase = priceBase || product.priceBase;
        product.priceOptions = priceOptions || product.priceOptions;
        product.discount = discount || product.discount;
        product.generalSpecifications = generalSpecifications || product.generalSpecifications;
        product.updatedBy = req.user._id;

        if (!updatedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const softDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        product.isDeleted = true;
        product.updatedBy = req.user._id;
        await product.save();
        res.status(200).json({message: 'Product soft deleted successfully'});
    } catch (error) {
        console.error('Error soft deleting product:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const hardDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    softDeleteProduct,
    hardDeleteProduct
};