const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the product Name"],
  },
  description: {
    type: String,
    require: [true, "Enter the product Description"],
  },
  price: {
    type: Number,
    require: [true, "Please Enter the product Price"],
    maxLength: [8, "Price caNNOT EXCCED by 8 character"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "please Enter product Stock"],
    maxLength: [4, "stock cannot exceed by 4 char"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

});
module.exports = mongoose.model("product", productSchema);
