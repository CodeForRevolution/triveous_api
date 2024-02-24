const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");
const router = express.Router();
router.route("/getAll").get(getAllProduct);
router.route("/new").post(createProduct);
router.route("/update/:id").put(updateProduct); // here we should make the authorization route by role
// so only admin can create the product and modified the product   but i am trying to keep this simple
router.route("/delete/:id").delete(deleteProduct);
module.exports = router;
