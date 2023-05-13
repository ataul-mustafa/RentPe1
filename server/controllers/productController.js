const mongoose = require('mongoose');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require('../utils/apiFeature');
const { ObjectId } = mongoose.Types;
const cloudinary = require('cloudinary');
const ObjectID = require('mongodb').ObjectId;



// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // console.log((req.body.address.city).toString());

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    try {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      // Handle the error, e.g. log or send an error response
      return next(new ErrorHandler(error, 400));
    }
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  // const address = {
  //   country: req.body.country,
  //   state: req.body.state,
  //   city: req.body.city,
  // };

  // req.body.address = address;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


// GET ALL PRODUCTS

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
  // filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// GET ALL PRODUCTS (Admin)
exports.getAdminProducts = catchAsyncError(async(req, res, next)=>{

    const products = await Product.find();


    res.status(200).json({
        success: true,
        products,
    })
});

// GET ALL PRODUCTS (Vendor)
exports.getVendorProducts = catchAsyncError(async(req, res, next)=>{

  const products = await Product.find({user: req.user.id});


  res.status(200).json({
      success: true,
      products,
  })
});

//Get product details

exports.getProductDetails = catchAsyncError(async(req, res, next)=>{

    const {id} = req.params;

    if (!ObjectId.isValid(id)) {
        return next(new ErrorHandler('Invalid product ID', 400));
    }


    const products = await Product.findById(id);

  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // products.country = products.address.country;
  // products.state = products.address.state;
  // products.city = products.address.city;


    res.status(200).json({
        success: true,
        products
    })

});

// update products --Admin

exports.updateProduct = catchAsyncError(async(req, res, next)=>{


    let product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHandler('Product not found', 404))
    }

      // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

 
    if(!req.body.city){
      req.body.country= product.country;
      req.body.state= product.state;
      req.body.city= product.city;
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModfy: false
    })
    res.status(200).json({
        success: true,
        product
    })
});

//Delete product 

exports.deleteProducts = catchAsyncError(async(req, res)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404)) 
    }

    // Deleting images from cloudinary
    for(let i=0; i < product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully..."
    })
});

// Create new review or update the review

exports.createProductReview = catchAsyncError( async(req, res, next)=>{
    const { rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )

    if (isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),
                (rev.comment = comment)
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    })
    product.ratings = avg/product.reviews.length
    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true,
    })
})

// Get all Reviews of a product --vendor
exports.getProductsReviews = catchAsyncError( async(req, res, next)=>{
    let product = await Product.findOne({
      _id: ObjectID(req.query.id),
      user: ObjectID(req.user.id)
    });

    // let product = await Product.findById(req.query.id);


    if (!product){
        return next( new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

// Get all Reviews of a product --admin
exports.getAllProductsReviews = catchAsyncError( async(req, res, next)=>{
    let product = await Product.findOne({
      _id: ObjectID(req.query.id)
    });


    if (!product){
        return next( new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})


// Delete a Review of a product
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let ratings = 0;
  let numOfReviews = reviews.length;

  if (numOfReviews > 0) {
    let sum = 0;
    reviews.forEach((rev) => {
      sum += rev.rating;
    });
    ratings = sum / numOfReviews;
  }

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModfy: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

 