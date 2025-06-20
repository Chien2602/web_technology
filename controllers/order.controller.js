const Order = require('../models/order.model');
const User = require('../models/user.model');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'fullname username email')
            .populate('products.product', 'title price thumbnail');
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
            .populate('user', 'fullname username email')
            .populate('products.product', 'title price thumbnail');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;

        if (!userId || !Array.isArray(products) || totalAmount === undefined) {
            return res.status(400).json({ message: 'User ID, products, and total amount are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = new Order({
            user: userId,
            products,
            totalAmount,
            createdBy: req.user._id,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const softDeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.isDeleted = true;
        order.updatedBy = req.user._id;
        await order.save();
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error soft deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const hardDeleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    softDeleteOrder,
    hardDeleteOrder
};