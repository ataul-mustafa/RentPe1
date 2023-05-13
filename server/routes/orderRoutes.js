const express = require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, getVendorOrders } = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')



router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/orders/vendor").get(isAuthenticatedUser, authorizeRoles("vendor"), getVendorOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("vendor"), updateOrder)
.delete(isAuthenticatedUser, authorizeRoles("vendor"), deleteOrder);



module.exports = router;