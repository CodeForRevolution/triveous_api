const Order = require("../model/OrderModel");
const Cart = require("../model/cart");
const ErrorHandler = require("../utils/Errorhandler");

module.exports.createOrder = async (req, res, next) => {
  try {
    const {
      address,
      country,
      city,
      pinCode,
      phoneNo,
      state,
      cart_id,
      user_id,
    } = req.body;

    // Find the cart and populate products
    const cart = await Cart.findOne({ _id: cart_id }).populate(
      "products.product_id"
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Extracting orderItems from cart
    const orderItems = cart.products.map((product) => ({
      name: product.product_id.name,
      price: product.product_id.price,
      quantity: product.qty,
      product_id: product.product_id, // Assuming product_id is the correct field
    }));

    // Calculating the  total price
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Creating the order

    console.log("your phone nuober", totalPrice);
    const order = await Order.create({
      shippingInfo: {
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      },
      orderItems,
      user: user_id,
      totalPrice,
    });
    order.totalPrice = totalPrice;
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return next(new ErrorHandler("Internal server Error", 5001));
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const order = await Order.find({ user: user_id });
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return next(new ErrorHandler("Server Error", 500));
  }
};

module.exports.getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({ _id: id }).populate(
      "orderItems.product_id"
    );
    console.log("your all order", order);

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    return next(new ErrorHandler("Internal server Error", 500));
  }
};
