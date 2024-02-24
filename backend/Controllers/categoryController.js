const Category=require("../model/categoryModel")
const ErrorHandler = require("../utils/Errorhandler");


module.exports.create=async (req,res,next)=>{
  const {name,description}=req.body;
  console.log("",name," ",description)
  if(!name||!description){
   return  res.status(401).json({
        success:false,
        message:"please enter both name and description"
    })
  }

  const category=await Category.create({
    name,
    description,
  })

 return res.status(200).json({
    message:"category created",
    data:category
  })
}

module.exports.getAll=async (req,res,next)=>{

try {

    const categories=await Category.find({});

    res.status(200).json({
      success:true,
      message:"got all category",
      data:categories
    })
    
} catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
}




 
}