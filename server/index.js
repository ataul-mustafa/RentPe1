const app = require('./app');
const cloudinary = require('cloudinary');

const connectDatabase = require('./config/database')

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path: "server/config/config.env"});
}


//handling uncaught errors
process.on("uncaughtException",(err)=>{
    console.log(`
    Error: ${err.message}
    Shutting down the server due to uncaught exception
    `)
    process.exit(1); 
})

//conneting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(process.env.PORT, ()=>{
    console.log('Server is running at http://localhost:' + (process.env.PORT))
})


// unhandled rejection error
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});