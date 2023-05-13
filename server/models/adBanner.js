const mongoose = require('mongoose');

const adBannerSchema = new mongoose.Schema({
    
    heading:{
        type:String,
        required:[true, "Please Enter banner heading"]
    },
    description:{
        type:String,
        required:[true, "Please Enter banner Description"]
    },
    
    image:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        },
    },

    productId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter Product Id"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    duration: {
        type: Number,
        required: [true, "Please enter duration in days"],
        default: 1,
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})

const AdBanner = mongoose.model("AdBanner", adBannerSchema);

module.exports = AdBanner;