const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_DB_CONFIG} = require("./config/app.config");
const errors = require("./middleware/errors.js");
const swaggerUi = require("swagger-ui-express"),swaggerDocument = require('./swagger.json');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    ()=>{
        console.log("Database connected");
    },
    (error)=>{
        console.log("Database can't be connected: "+ error);
    }
);


app.use(express.json());// is middleware that parses incoming JSON requests and makes them available as a req.body object.
app.use("/uploads",express.static("uploads"));// serves static files from the uploads directory.
app.use("/api",require("./routes/app.routes"));//requires and uses the routes defined in ./routes/app.routes.
app.use(errors.errorHandler);//requires and uses error handling middleware.
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument));//serves Swagger documentation at /api-docs endpoint.

app.listen(process.env.port || 4000, function(){
    console.log("Ready to go");
});
