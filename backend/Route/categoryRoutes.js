const express=require("express");

const { create, getAll } = require("../Controllers/categoryController");
const router=express.Router();

router.route("/new").post(create);
router.route("/getAll").get(getAll);


module.exports=router;



