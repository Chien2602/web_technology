const Cart = require('../models/cart.model');
const User = require('../models/user.model');

const getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({user: userId})
            .populate('user', 'fullname username email')
            .populate('products.product', 'title price thumbnail');
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const createCart = async (req, res) => {
    try {
        const {userId, products} = req.body;

        if (!userId || !Array.isArray(products)) {
            return res.status(400).json({message: 'User ID and products are required'});
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const newCart = new Cart({
            user: userId,
            products,
        });

        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const updateCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const {products} = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }

        cart.products = products || cart.products;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cartId = req.params.id;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }

        cart.products = [];
        await cart.save();
        res.status(200).json({message: 'All products removed from cart', cart});
    } catch (error) {
        console.error('Error deleting products from cart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const addProductToCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const {productId, quantity} = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({message: 'Product ID and quantity are required'});
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({product: productId, quantity});
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    getCartByUserId,
    createCart,
    updateCart,
    deleteAllProductsFromCart,
    addProductToCart
};