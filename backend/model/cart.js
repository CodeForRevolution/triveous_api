const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
      },
      qty: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
