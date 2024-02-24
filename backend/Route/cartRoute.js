const express=require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../utils/auth");
const { addIntoCart, myCart, removeItemFromCart, updateCartItem } = require("../Controllers/cartController");
const router=express.Router();

router.route("/new").post(isAuthenticatedUser,addIntoCart);//authenticating the user before hitting to conttroller
router.route("/mycart").put(isAuthenticatedUser,myCart);//authenticating the user before hitting to conttroller
router.route("/delete").delete(isAuthenticatedUser,removeItemFromCart);//authenticating the user before hitting to conttroller
router.route("/update").put(isAuthenticatedUser,updateCartItem);//authenticating the user before hitting to conttroller


module.exports=router;
