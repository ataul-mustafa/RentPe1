const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require('../utils/apiFeature');
const Product = require('../models/productModel');


//Create new order
exports.newOrder = catchAsyncError( async(req, res, next)=>{
    
    const { 
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrices,
    } = req.body;
    

    let orders = [];

    for (let i=0; i<orderItems.length; i++){

        const item = orderItems[i];
        const itemPrice = itemsPrices[i].subtotal;
        const taxPrice = itemsPrices[i].tax;
        const shippingPrice = itemsPrices[i].shippingCharges;
        const totalPrice = itemsPrices[i].totalPrice;

        const product = await Product.findById(item.product);
        const vendor = product.user;

        const order = await Order.create({
            shippingInfo,
            item,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
            vendor,
        })

        orders.push(order)
    }

    res.status(201).json({
        success: true,
        order: orders,
    })
})


// get single order
exports.getSingleOrder = catchAsyncError( async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order){
        return next( new ErrorHandler("Order not found with this id"));
    }

    res.status(200).json({
        success: true,
        order,
    })
})

// get logged in user order
exports.myOrders = catchAsyncError( async(req, res, next)=>{
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders,
    })
})

// Get all orders -- Admin
exports.getAllOrders = catchAsyncError( async(req, res, next)=>{
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})

// Get all orders -- vendors
exports.getVendorOrders = catchAsyncError( async(req, res, next)=>{
    
    const orders = await Order.find({vendor: req.user.id});
    if(!orders){
        return next( new ErrorHandler("You do not have any order"));
    }

    let totalAmount = 0;
    orders.forEach((order, index)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})

// update order status -- Admin
exports.updateOrder = catchAsyncError( async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if (!order){
        return next( new ErrorHandler("Order not found with this id"));
    }

    if (order.orderStatus === "Delivered"){
        return next( new ErrorHandler("You have already deliverd this product", 400));
    }

    if (req.body.status === "Shipped") {
          await updateStock(order.item.product, order.item.quantity);
      }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false})
    res.status(200).json({
        success: true,
        order,
    })
})


async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false })
}

// Delete order -- Admin
exports.deleteOrder = catchAsyncError( async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if (!order){
        return next( new ErrorHandler("Order not found with this id"));
    }

    await order.remove()

    res.status(200).json({
        success: true,
        order,
    })
})