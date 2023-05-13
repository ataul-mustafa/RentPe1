const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProducts, getProductDetails, createProductReview, getProductsReviews, deleteReview, getAdminProducts, getVendorProducts, getAllProductsReviews } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);
router.route("/vendor/products").get(isAuthenticatedUser, authorizeRoles("vendor"), getVendorProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/vendor/reviews").get(isAuthenticatedUser, authorizeRoles("vendor"), getProductsReviews)
.delete(isAuthenticatedUser, authorizeRoles("vendor"), deleteReview);
router.route("/admin/reviews").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsReviews);


module.exports = router; 