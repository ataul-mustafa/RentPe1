//error.js

const ErrorHandler = require('../utils/errorHandler.js');

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb id error
    if (err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new ErrorHandler(err.message, 400);
    }

    // duplocate key error
    if (err.code === 11000){
        const message = `${Object.keys(err.keyValue)} already exists. `
        err = new ErrorHandler(message, 401);
    }

    // wrong jwt error
    if (err.name === 'JsonWebTokenError'){
        const message = `jsonwebToken is invalid , try again `
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.name === 'TokenExpiredError'){
        const message = `jsonwebToken is expired , try again `
        err = new ErrorHandler(message, 400);
    }

    return (
        res.status(err.statusCode).json(
            {
                success: false,
                message: err.message,
            }
        )
    )
}