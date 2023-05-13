const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError");
const AdBanner = require('../models/adBanner.js');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const cloudinary = require('cloudinary');



exports.createAdBanner = catchAsyncError( async(req, res, next) =>{
    const bannerData = {
        heading: req.body.heading,
        description: req.body.description,
        productId: req.body.productId,
        duration: req.body.duration,
        image: {}
    }

    const product = await Product.findById(req.body.productId);
    
    if(!product){
        return next(new ErrorHandler("Please Enter a valid product id", 404))
    }


    if (req.body.avatar !== ""){
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "adBanners",
            width: 2100,
            crop: "scale"
        });
    
        bannerData.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

    }else {
        return next(new ErrorHandler("You can not choose multiple images", 404))
    }

    bannerData.user = req.user.id;
    
    const data = await AdBanner.create(bannerData);

    res.status(200).json({
        data,
        success: true,
    })

});
  

// GET ALL Banner

exports.getAllBanners = catchAsyncError(async (req, res, next) => {
  
    const banner = await AdBanner.find();

    if(!banner){
        return next(new ErrorHandler("banners not found", 404))
    }
    const productsCount = await AdBanner.countDocuments();
  
    res.status(200).json({
      success: true,
      banner,
      productsCount
    });
  });