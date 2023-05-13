const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { createAdBanner, getAllBanners } = require('../controllers/adBannerController');

const router = express.Router();

router.route('/create/adBanner').post(isAuthenticatedUser, authorizeRoles('vendor'), createAdBanner);
router.route('/get/adBanner').get(getAllBanners);


module.exports = router;