const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  softDeleteOrder,
  hardDeleteOrder,
} = require('../controllers/order.controller');
const { checkToken, checkPermissions } = require('../middlewares/auth.middleware');

router.get('/', checkToken, checkPermissions(["order:read"]), getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/soft-delete/:id', checkToken, checkPermissions(["order:update"]), softDeleteOrder);
router.delete('/hard-delete/:id', checkToken, checkPermissions(["order:delete"]), hardDeleteOrder);

module.exports = router;