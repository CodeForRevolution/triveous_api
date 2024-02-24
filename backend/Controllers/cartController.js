const Cart = require("../model/cart");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/Errorhandler");
module.exports.addIntoCart = async (req, res, next) => {
  const { product_id } = req.body;
  const cart = await Cart.findOne({ _id:req.user.cart_id});
  cart.products.push({
    product_id: product_id,
    qty: 1,
  });

  await cart.save();

  res.status(200).json({
    success: true,
    message: "product added into cart",
  });
};

module.exports.myCart = async (req, res, next) => {

  const cart = await Cart.findOne({ _id: req.user.cart_id }).populate(   // accessing the user from req
    "products.product_id"
  );
  console.log("your cart", cart);
  res.status(200).json({
    success: true,
    message: "cart Data",
    data: cart,
  });
};

module.exports.removeItemFromCart = async (req, res, next) => {
  const { item_id } = req.body;
  const cart = await Cart.findOne({ _id: req.user.cart_id });
  const index = cart.products.findIndex((item) => item._id === item_id);

  console.log("index", index);
  if (index === -1) {
    return next(new ErrorHandler("item is not found in cart", 400));
  }
  cart.products.splice(index, 1);
  await cart.save();
  res.status(200).json({
    message: "item remove from cart",
    success: true,
  });
};


module.exports.updateCartItem = async (req, res, next) => {
 try {
    const { item_id,qty } = req.body;
   
    const cart = await Cart.findOne({ _id: req.user.cart_id});
   
    cart.products.forEach((item)=>{
        if(item._id.equals(new mongoose.Types.ObjectId(item_id))){  // finding the item in cart and updating the item
            item.qty=qty
        }
    })
    await cart.save();
    res.status(200).json({
      message: "product qty updated",
      success: true,
    });
 } catch (error) {
    return next(new ErrorHandler("Internal server Error", 500));
 }
  };

