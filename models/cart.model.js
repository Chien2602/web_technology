const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    totalProducts: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

cartSchema.pre('save', function (next) {
    this.totalProducts = this.products.reduce((total, product) => total + product.quantity, 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema, 'carts');
module.exports = Cart;