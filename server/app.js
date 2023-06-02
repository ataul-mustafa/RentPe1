const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errormiddleware = require('./middleware/error.js');
const path = require('path');


if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path: "server/config/config.env"});
}


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

// app.use(express.json({ limit: "50mb" })); 
// app.use(express.urlencoded({ limit: "50mb", extended: true }));



//Route importing
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");
const adBanner = require("./routes/adBannerRoute.js");

app.use("/api/v1", product);
app.use("/api/v1", user)
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", adBanner);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})

//middleware for error
app.use(errormiddleware)


module.exports = app;


// mongodb+srv://ataulmustafa143:yxroiiMO3otIn5jT@cluster0.3omutgq.mongodb.net/