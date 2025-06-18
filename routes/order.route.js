const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  softDeleteOrder,
  hardDeleteOrder,
} = require('../controllers/order.controller');

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/soft-delete/:id', softDeleteOrder);
router.delete('/hard-delete/:id', hardDeleteOrder);

module.exports = router;