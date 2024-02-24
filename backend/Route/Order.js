const express = require("express");
const { createOrder, getAll, getOrderById } = require("../Controllers/order");
const router = express.Router();

router.route("/new").post(createOrder);
router.route("/getAll/:id").get(getAll);
router.route("/orderById/:id").get(getOrderById);


module.exports = router;
