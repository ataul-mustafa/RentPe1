const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require('../utils/jwtToken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');
const { findById } = require('../models/userModel');
const cloudinary = require('cloudinary');


// Register a user

exports.registerUser = catchAsyncError( async(req, res, next) =>{


    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }


    if (req.body.avatar !== ""){
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
    
        userData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

    }
    
    const user = await User.create(userData);

    sendToken(user, 201, res);

});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return next(new ErrorHandler("Email or Password is missing", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if (!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password", 401))
    }

    sendToken(user, 200, res);
});

//Logout
exports.logout = catchAsyncError(async (req, res, next) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot password

exports.forgotPassword = catchAsyncError( async(req, res, next)=>{
    const user = await User.findOne({ email: req.body.email })
    // console.log(user);

    if (!user){
        return next(new ErrorHandler("User not found", 404))
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false});
    const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;   /* ${req.get("host")} */

    const message = `Your password reset ulr is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then ignore it`;


    try{
        await sendEmail({
            email: user.email,
            subject: "RentPe Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            msg: `Email sent to ${user.email} successfully`,
            message,
        })

    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 500)); /*500*/
    }
})

// Reset Password
exports.resetPassword = catchAsyncError( async(req, res, next)=>{
    // creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now()},
    })

    if (!user){
        return next(new ErrorHandler("Reset Password token is invalid or expired", 404)) /*400*/
    }

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doest not match", 404)); /*404*/
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    sendToken(user, 200, res);
})

// Get user details
exports.getUserDetails = catchAsyncError( async(req, res, next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
})

// Update user password
exports.updateUserPassword = catchAsyncError( async(req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Old password", 400)) /*400*/
    }

    if(req.body.oldPassword === req.body.newPassword){
        return next(new ErrorHandler("Old Password and New password should be different", 400)) /*400*/
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and confirm-password are different", 400)) /*400*/
    }

    user.password = req.body.newPassword;

    await user.save();


    sendToken(user, 200, res);
})

// Update user profile
exports.updateUserProfile = catchAsyncError( async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar !== ""){

        const user = await User.findById(req.user.id);
        const imageId =  user.avatar.public_id;

        if(imageId){
            await cloudinary.v2.uploader.destroy(imageId);

        }
        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
    
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

    }


    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})

// Get All users
exports.getAllUser = catchAsyncError( async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

// Get Single user
exports.getSingleUser = catchAsyncError( async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if (!user){
        return next( new ErrorHandler(`User doesnt exists with id ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// Update user role --Admin
exports.updateUserRole = catchAsyncError( async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})

// Delete user --Admin
exports.deleteUser = catchAsyncError( async(req, res, next)=>{

    
    // deleter user avatar later using cloudanary

    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    await user.remove();
    res.status(200).json({
        success: true,
        message: "user deleted successfully",
    })
})
