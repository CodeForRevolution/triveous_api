const express=require("express");
const app=express();
const cookieParser =require("cookie-parser");
const cors=require("cors")
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
const errormiddleware=require("./middleware/error")
app.use("/api/v1/user/",require("./Route/userRoute"));
app.use("/api/v1/category/",require("./Route/categoryRoutes"))
app.use("/api/v1/product",require("./Route/productRoute"));
app.use("/api/v1/cart",require("./Route/cartRoute"));
app.use("/api/v1/order",require("./Route/Order"));
//middleware for the Error
app.use(errormiddleware);
module.exports=app;