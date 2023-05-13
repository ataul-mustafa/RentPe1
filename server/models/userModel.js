const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name can not be excedd 330 characters"],
        minLength: [4, "Name should have more than or eqaul to 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter you Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minLength: [8, "Password must contains at least 8 characters"],
        select: false
    },
    avatar: {
        public_id:{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        },
    },

    role: {
        type: String,
        default: "user"
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
 
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}); 

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

// JWT Tokens
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    const result = await bcrypt.compare(enteredPassword, this.password);
    return result;
};

//Generating password reset token
userSchema.methods.getResetPasswordToken = function(){

    //Generating Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hashing and adding resetPasswordingToken to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model("User", userSchema);