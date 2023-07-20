const mongoose = require('mongoose');
// const { type } = require('os');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price can not be exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Products Stock"],
        maxLength: [4, "Stock can not be exceed 4 characters"],
        default: 1
    },
    minDuration: {
        type: Number,
        default: 1,
    },
    duration: {
        type: Number,
        default: function () { return this.minDuration }
    },

    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },


    country: {
        type: String,
        required: [true, "Please enter the country name"]
    },
    state: {
        type: String,
        required: [true, "Please enter the state name"]
    },
    city: {
        type: String,
        required: [true, "Please enter the city name"]
    },



    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;


// const StudentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     email: {
//         type: String,
//     }, 
//     education: [
//         {
//             qualification: {
//                 type: String,
//             }
//         }
//     ],
// })
